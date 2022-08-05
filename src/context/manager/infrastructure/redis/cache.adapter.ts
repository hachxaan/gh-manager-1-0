import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ICacheData } from 'src/context/manager/domain/adapters/cache-data.interface';
import Symbols from '../../symbols';
import { CacheService } from './cache.service';

@Injectable()
export class CacheDataAdapter implements ICacheData {
  constructor(private moduleRef: ModuleRef) {}
  async get(key: string): Promise<any> {
    return await this.moduleRef
      .get<CacheService>(Symbols.CacheService)
      .getJSON(key);
  }
  async set(key: string, value: any): Promise<void> {
    await this.moduleRef
      .get<CacheService>(Symbols.CacheService)
      .setJSON(key, value);
  }

  async flushAll(): Promise<void> {
    await this.moduleRef.get<CacheService>(Symbols.CacheService).flushAll();
  }
}
