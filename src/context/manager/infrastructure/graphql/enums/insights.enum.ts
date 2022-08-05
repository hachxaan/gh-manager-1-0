import { registerEnumType } from '@nestjs/graphql';

export enum PeriodEnum {
  P30 = 30,
  P60 = 60,
  P90 = 90,
}

registerEnumType(PeriodEnum, {
  name: 'Period',
  description: 'Consulting period [30|60|90] days',
});

export enum RoomTypeEnum {
  business = 'business',
  residential = 'residential',
}

registerEnumType(RoomTypeEnum, {
  name: 'RoomsType',
  description: 'Rooms Type [business|residential]',
});
