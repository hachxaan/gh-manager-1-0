import AppConfig from '../../../../app.config';
import { ConfigType } from '@nestjs/config';
import { createClient } from 'redis';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CacheService {
  private logger: Logger = new Logger(CacheService.name);

  constructor(
    @Inject(AppConfig.KEY)
    private configService: ConfigType<typeof AppConfig>,
  ) {}

  private client = createClient({
    url: this.configService.redis.url,
  });

  async setClient() {
    if (!this.client.isOpen) await this.client.connect();
  }

  async getJSON(key: string): Promise<any> {
    try {
      this.setClient();
      await this.client.SELECT(this.configService.redis.db);
      const data = await this.client.json.get(key);
      await this.client.quit();
      return data;
    } catch (except) {
      this.logger.error(except);
    }
  }
  async setJSON(key: string, value: any): Promise<void> {
    try {
      this.setClient();
      await this.client.SELECT(this.configService.redis.db);
      await this.client.json.set(key, '.', value);
      await this.client.quit();
    } catch (except) {
      this.logger.error(except);
    }
  }

  async flushAll(): Promise<void> {
    try {
      this.setClient();
      await this.client.SELECT(this.configService.redis.db);
      await this.client.flushAll();
      await this.client.quit();
    } catch (except) {
      this.logger.error(except);
    }
  }
}
