import { ValueObject } from "Domain/models/shared/ValueObject";

export class QuantityAvailable extends ValueObject<
  number,
  "QuantityAvailable"
> {
  static readonly MAX: number = 1000000;
  static readonly MIN: number = 0;

  constructor(value: number) {
    super(value);
  }

  protected validate(value: number): void {
    if (value < QuantityAvailable.MIN || value > QuantityAvailable.MAX)
      throw new Error(
        `在庫数は ${QuantityAvailable.MIN} から ${QuantityAvailable.MAX} の間でなければなりません。`
      );
  }

  increment(amount: number): QuantityAvailable {
    const newValue = this._value + amount;

    return new QuantityAvailable(newValue);
  }

  decrement(amount: number): QuantityAvailable {
    const newValue = this._value - amount;

    return new QuantityAvailable(newValue);
  }
}
