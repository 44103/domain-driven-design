import { ValueObject } from "Domain/models/shared/ValueObject";
import { nanoid } from "nanoid";

export class StockId extends ValueObject<string, "StockId"> {
  static readonly MAX_LENGTH = 100;
  static readonly MIN_LENGTH = 1;

  constructor(value: string = nanoid()) {
    // デフォルトではnanoidを利用しID生成
    super(value);
  }

  protected validate(value: string): void {
    if (value.length < StockId.MIN_LENGTH || value.length > StockId.MAX_LENGTH)
      throw new Error(
        `StockId は ${StockId.MIN_LENGTH} 文字以上、 ${StockId.MAX_LENGTH} 文字以下でなければなりません。`
      );
  }
}
