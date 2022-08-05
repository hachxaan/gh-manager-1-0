import { UuidHelper } from './uuid.helper';
import { ValueObject } from './value-object';

export class Id extends ValueObject<string> {
  private uuidHelper: UuidHelper;

  private constructor(value: string) {
    super();
    this.uuidHelper = UuidHelper.of();
    this.setValue(value);
  }

  static of(): Id;
  static of(value: string): Id;

  static of(value?: string): Id {
    value = value || UuidHelper.of().generate();
    return new Id(value);
  }

  protected setValue(value: string): void {
    if (this.uuidHelper.validate(value) === false) {
      throw new Error('Invalid ID as uuid');
    }
    this.value = value;
  }
}
