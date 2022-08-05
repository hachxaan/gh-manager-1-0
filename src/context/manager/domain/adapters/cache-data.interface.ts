export interface ICacheData {
  get(key: string): Promise<any>;
  set(key: string, value: any): Promise<void>;
  flushAll(): Promise<void>;
}
