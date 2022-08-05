import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICacheData } from 'src/context/manager/domain/adapters/cache-data.interface';
import Symbols from '../../../symbols';
import { DataBaseService } from '../../database/database.service';
import { RoomsInput } from '../../graphql/inputs/rooms_.input_';
import { ProviderService } from '../../provider/provider.service';

@Injectable()
export class GetRoomsByRoomTypeService {
  private logger: Logger = new Logger(GetRoomsByRoomTypeService.name);
  constructor(
    @Inject(Symbols.ICacheData)
    private cacheData: ICacheData,
    private dataBaseService: DataBaseService,
    private providerService: ProviderService,
  ) {}

  async resolve(hotel_id: number): Promise<any> {
    const selectRequiredData = (rooms: any[]) =>
      rooms.reduce(
        (
          result: { [s: string]: string } | ArrayLike<string>,
          { room_type, room_id, room_name },
        ) => {
          if (
            !Object.keys(
              Object.fromEntries(
                Object.entries(result).filter(([key]) => key == room_type),
              ),
            ).length
          )
            result[room_type] = {};
          result[room_type][room_id] = {
            room_id: room_id,
            room_name: room_name,
            room_type: room_type,
            prices: [],
            last_updated_at: new Date(),
          };
          return result;
        },
        {},
      );

    try {
      const roomsCache = await this.cacheData.get(`rooms:${hotel_id}`);
      if (roomsCache) {
        this.logger.verbose('From Cache.....');
        return roomsCache;
      } else {
        const roomsDatabase = await this.dataBaseService.getRooms(hotel_id);
        if (roomsDatabase) {
          this.logger.verbose('From Database...');

          const rooms = roomsDatabase.rooms;

          await this.cacheData.set(`rooms:${hotel_id}`, rooms);

          return rooms;
        } else {
          const roomsProvider = await this.providerService.getRooms(hotel_id);

          if (roomsProvider) {
            this.logger.verbose('From Provider');
            this.logger.verbose('->');

            const rooms = selectRequiredData(roomsProvider.rooms);
            await this.cacheData.set(`rooms:${hotel_id}`, rooms);
            const roomInput = new RoomsInput();
            roomInput.hotel_id = hotel_id;
            roomInput.rooms = rooms;
            await this.dataBaseService.setRooms(roomInput);
            return rooms;
          } else {
            return {};
          }
        }
      }
    } catch (except) {
      console.log(except);
    }
  }
}
