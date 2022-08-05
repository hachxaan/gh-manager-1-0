import { v4, validate } from 'uuid';

export class UuidHelper {
  private static instance: UuidHelper;

  static of(): UuidHelper {
    if (!this.instance) {
      this.instance = new UuidHelper();
    }
    return this.instance;
  }

  generate(): string {
    return v4();
  }

  validate(uuid: string): boolean {
    return validate(uuid);
  }
}
