export abstract class ValueObject<T> {
  protected value: T;
  protected abstract setValue(value: T): void;
  getValue(): T {
    return this.value;
  }
}
