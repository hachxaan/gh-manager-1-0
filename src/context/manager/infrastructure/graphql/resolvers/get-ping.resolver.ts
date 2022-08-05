import { Query, Resolver } from '@nestjs/graphql';
import { PingType } from '../dtos/ping.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Resolver(() => PingType)
export class PingResolver {
  constructor(private readonly httpService: HttpService) {}

  @Query(() => PingType)
  async ping(): Promise<PingType> {
    const urlHealth = 'http://127.0.0.1:3000/health';
    const response = await lastValueFrom(this.httpService.get(urlHealth));
    const db = response.data['info']['db']['status'];
    const local_api = response.data['info']['local_api']['status'];
    const local_cache = response.data['info']['local_cache']['status'];
    const external_api = response.data['info']['external_api']['status'];

    const result = {
      db,
      local_api,
      local_cache,
      external_api,
    };
    return result;
  }
}
