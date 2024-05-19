import { ValueObject } from "Domain/models/shared/ValueObject";

export class Title extends ValueObject<string, "Title"> {
  static readonly MAX_LENGTH = 1000;
  static readonly MIN_LENGTH = 1;

  constructor(value: string) {
    super(value);
  }

  protected validate(value: string): void {
    if (value.length < Title.MIN_LENGTH || value.length > Title.MAX_LENGTH) {
      throw new Error(
        `タイトルは ${Title.MIN_LENGTH} 文字以上、 ${Title.MAX_LENGTH} 文字以下でなければなりません。`
      );
    }
  }
}
