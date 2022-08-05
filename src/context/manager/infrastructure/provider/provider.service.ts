import { Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InsightsInputDto } from 'src/context/manager/domain/dtos/insights-input.dto';
import { ModuleRef } from '@nestjs/core';
import Symbols from '../../symbols';
import { MetricsInputDto } from 'src/context/manager/domain/dtos/metrics-input.dto';
import { PeriodsBuilder } from '../strategies/resolvers/periods.builder';
import { ICacheData } from 'src/context/manager/domain/adapters/cache-data.interface';
import { ConfigType } from '@nestjs/config';
import AppConfig from '../../../../app.config';

@Injectable()
export class ProviderService {
  private logger: Logger = new Logger(ProviderService.name);

  constructor(
    private readonly httpService: HttpService,
    @Inject(AppConfig.KEY)
    private configService: ConfigType<typeof AppConfig>,
    private moduleRef: ModuleRef,
    @Inject(Symbols.ICacheData)
    private cacheData: ICacheData,
  ) {}

  async getRooms(hotel_id: number): Promise<any> {
    try {
      const url = `${this.configService.provider.url}/hotels/${hotel_id}`;
      const { data } = await this.httpService.axiosRef.get(url);
      return data;
    } catch (except) {
      this.logger.error(except);
    }
  }

  async getPricesMetrics(input: MetricsInputDto): Promise<any> {
    const periodsBuilder = this.moduleRef.get<PeriodsBuilder>(
      Symbols.PeriodsBuilder,
    );
    try {
      const baseUrl = `${process.env.PROVIDER_HOST}:${process.env.PROVIDER_PORT}${process.env.PROVIDER_PATH_HOTELS}/${input.hotel_id}/prices?`;

      const periodos = await periodsBuilder.getPeriodoDateMetricsProvider(
        input,
      );

      const prices = {};
      for (let index = 0; index < periodos.length; index++) {
        if (periodos[index].inCache) {
          const data = await this.cacheData.get(periodos[index].keyCache);
          for (const [room, add_prices] of Object.entries(data.prices)) {
            if (!prices[room]) prices[room] = [];
            prices[room] = [...prices[room], add_prices[0]];
          }
        } else {
          const url = `${baseUrl}start_date=${periodos[index].start_date}&end_date=${periodos[index].end_date}`;
          const { data } = await this.httpService.axiosRef.get(url);
          await this.cacheData.set(periodos[index].keyCache, data);
          for (const [room, add_prices] of Object.entries(data.prices)) {
            if (!prices[room]) prices[room] = [];
            prices[room] = [...prices[room], add_prices[0]];
          }
        }
      }
      return prices;
    } catch (except) {
      this.logger.error(except);
    }

    return {};
  }

  async getPrices(input: InsightsInputDto): Promise<any> {
    const periodsBuilder = this.moduleRef.get<PeriodsBuilder>(
      Symbols.PeriodsBuilder,
    );
    try {
      const baseUrl = `${process.env.PROVIDER_HOST}:${process.env.PROVIDER_PORT}${process.env.PROVIDER_PATH_HOTELS}/${input.hotel_id}/prices?`;
      const periodos = await periodsBuilder.getPeriodoDateProvider(input);

      const prices = {};
      for (let index = 0; index < periodos.length; index++) {
        if (periodos[index].inCache) {
          /** Get data from cache */
          const data = await this.cacheData.get(periodos[index].keyCache);
          for (const [room, add_prices] of Object.entries(data.prices)) {
            if (!prices[room]) prices[room] = [];
            prices[room] = [...prices[room], add_prices[0]];
          }
        } else {
          /** Get data from provider */
          const url = `${baseUrl}start_date=${periodos[index].start_date}&end_date=${periodos[index].end_date}`;
          const { data } = await this.httpService.axiosRef.get(url);
          await this.cacheData.set(periodos[index].keyCache, data);
          for (const [room, add_prices] of Object.entries(data.prices)) {
            if (!prices[room]) prices[room] = [];
            prices[room] = [...prices[room], add_prices[0]];
          }
        }
      }
      return prices;
    } catch (except) {
      this.logger.error(except);
    }
  }
}
