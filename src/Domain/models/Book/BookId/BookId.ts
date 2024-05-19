import { ValueObject } from "Domain/models/shared/ValueObject";

export class BookId extends ValueObject<string, "BookId"> {
  static MAX_LENGTH = 13;
  static MIN_LENGTH = 10;

  constructor(value: string) {
    super(value);
  }

  protected validate(value: string): void {
    if (!this.isValidIsbn10(value) && !this.isValidIsbn13(value))
      throw new Error("不正な ISBN の形式です");
  }

  private isValidIsbn10(isbn10: string): boolean {
    // ISBN-10 のバリデーションロジックを実装
    // 実際の実装ではここにチェックディジットを計算するロジックが必要です。
    return isbn10.length === BookId.MIN_LENGTH; // ここを実際のチェックディジット計算に置き換える
  }

  private isValidIsbn13(isbn13: string): boolean {
    // ISBN-13 のバリデーションロジックを実装
    // ここでは簡単な例を示しますが、実際にはより複雑なチェックが必要です
    return isbn13.length === BookId.MAX_LENGTH && isbn13.startsWith("978");
  }

  get value(): string {
    return this._value;
  }

  toISBN(): string {
    if (this._value.length === BookId.MIN_LENGTH) {
      // ISBNが 10 桁の場合の `ISBN` フォーマットに変換します。
      const groupIdentifier = this._value.substring(0, 1); // 国コードなど（1桁）
      const publisherCode = this._value.substring(1, 3); // 出版者コード（2桁）
      const bookCode = this._value.substring(3, 9); // 書籍コード（6桁）
      const checksum = this._value.substring(9); // チェックディジット（1桁）

      return `ISBN${groupIdentifier}-${publisherCode}-${bookCode}-${checksum}`;
    }
    // ISBNが 13 桁の場合の `ISBN` フォーマットに変換します。
    const isbnPrefix = this._value.substring(0, 3); // 最初の 3 桁 (978 または 979)
    const groupIdentifier = this._value.substring(3, 4); // 国コードなど（1桁）
    const publisherCode = this._value.substring(4, 6); // 出版者コード（2桁）
    const bookCode = this._value.substring(6, 12); // 書籍コード（6桁）
    const checksum = this._value.substring(12); // チェックディジット（1桁）

    return `ISBN${isbnPrefix}-${groupIdentifier}-${publisherCode}-${bookCode}-${checksum}`;
  }
}
