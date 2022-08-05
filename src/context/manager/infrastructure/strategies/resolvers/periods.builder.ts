import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import * as moment from 'moment';
import { ICacheData } from 'src/context/manager/domain/adapters/cache-data.interface';
import { InsightsInputDto } from 'src/context/manager/domain/dtos/insights-input.dto';
import { MetricsInputDto } from 'src/context/manager/domain/dtos/metrics-input.dto';
import Symbols from '../../../symbols';
import { PeriodEnum } from '../../graphql/enums/insights.enum';

export type PerdiodDateType = {
  start_date: string;
  end_date: string;
};

type PerdiodDateProviderType = {
  start_date: string;
  end_date: string;
  keyCache: string;
  inCache: boolean;
};

@Injectable()
export class PeriodsBuilder {
  constructor(
    private moduleRef: ModuleRef,
    @Inject(Symbols.ICacheData)
    private cacheData: ICacheData,
  ) {}

  async getPeriodoDateMetricsProvider(
    input: MetricsInputDto,
  ): Promise<[PerdiodDateProviderType]> {
    const padTo2Digits = (num) => num.toString().padStart(2, '0');
    const formatDate = (date) =>
      [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join('%2F');

    const dateQuery = input.day.split('/').reverse().join('-');

    const end_date = new Date(dateQuery);
    const start_date = new Date(dateQuery);

    const periodDates = [];

    const month = start_date.getMonth() + 1;
    const year = start_date.getFullYear();
    const keyCache = `hotel:${input.hotel_id}:m:${month}:y:${year}`;

    const dateIndexCache = await this.cacheData.get(keyCache);

    periodDates.unshift({
      start_date: formatDate(
        moment(start_date, 'YYYY-MM-DD').startOf('month').toDate(),
      ),
      end_date: formatDate(
        moment(end_date, 'YYYY-MM-DD').endOf('month').toDate(),
      ),
      keyCache: keyCache,
      inCache: !!dateIndexCache,
    });
    return <[PerdiodDateProviderType]>periodDates;
  }

  async getPeriodoDateProvider(
    input: InsightsInputDto,
  ): Promise<[PerdiodDateProviderType]> {
    const padTo2Digits = (num) => num.toString().padStart(2, '0');
    const formatDate = (date) =>
      [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join('%2F');

    const getMonthUse = (d1, d2) => {
      let months: number;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth();
      months += d2.getMonth();
      return months <= 0 ? 0 : months;
    };
    const end_date = new Date();
    const start_date = new Date();
    start_date.setDate(start_date.getDate() - input.period);
    const monthUse = getMonthUse(start_date, end_date);
    const periodDates = [];
    if (monthUse == 0) {
      const month = start_date.getMonth() + 1;
      const year = start_date.getFullYear();
      const keyCache = `hotel:${input.hotel_id}:m:${month}:y:${year}`;
      const dateIndexCache = await this.cacheData.get(keyCache);
      periodDates.unshift({
        start_date: formatDate(moment(start_date).startOf('month').toDate()),
        end_date: formatDate(moment(end_date).startOf('month').toDate()),
        keyCache: keyCache,
        inCache: !!dateIndexCache,
      });
    } else {
      const currentDateProcess = new Date();
      for (let month = 0; month <= monthUse; month++) {
        const month = currentDateProcess.getMonth() + 1;
        const year = currentDateProcess.getFullYear();
        const keyCache = `hotel:${input.hotel_id}:m:${month}:y:${year}`;
        const dateIndexCache = await this.cacheData.get(keyCache);

        periodDates.unshift({
          start_date: formatDate(
            moment(currentDateProcess).startOf('month').toDate(),
          ),
          end_date: formatDate(
            moment(currentDateProcess).endOf('month').toDate(),
          ),
          keyCache: keyCache,
          inCache: !!dateIndexCache,
        });
        currentDateProcess.setMonth(currentDateProcess.getMonth() - 1);
      }
    }
    return <[PerdiodDateProviderType]>periodDates;
  }

  getPeriodDates(period: PeriodEnum): [PerdiodDateType] {
    const padTo2Digits = (num) => num.toString().padStart(2, '0');
    const formatDate = (date) =>
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-');

    const getMonthUse = (d1, d2) => {
      let months: number;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth();
      months += d2.getMonth();
      return months <= 0 ? 0 : months;
    };

    const end_date = new Date();
    const start_date = new Date();
    start_date.setDate(start_date.getDate() - period);
    const monthUse = getMonthUse(start_date, end_date);
    const periodDates = [];

    if (monthUse == 0) {
      periodDates.unshift({
        start_date: formatDate(start_date),
        end_date: formatDate(end_date),
      });
    } else {
      const currentDateProcess = new Date();
      for (let month = 0; month <= monthUse; month++) {
        if (month == 0) {
          const fi = moment(new Date()).startOf('month').toDate();
          periodDates.unshift({
            start_date: formatDate(fi),
            end_date: formatDate(end_date),
          });
        } else if (month == monthUse) {
          periodDates.unshift({
            start_date: formatDate(start_date),
            end_date: formatDate(moment(start_date).endOf('month').toDate()),
          });
        } else {
          currentDateProcess.setMonth(currentDateProcess.getMonth() - 1);
          periodDates.unshift({
            start_date: formatDate(
              moment(currentDateProcess).startOf('month').toDate(),
            ),
            end_date: formatDate(
              moment(currentDateProcess).endOf('month').toDate(),
            ),
          });
        }
      }
    }
    return <[PerdiodDateType]>periodDates;
  }
}
