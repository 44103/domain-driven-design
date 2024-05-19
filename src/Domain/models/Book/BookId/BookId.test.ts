import { BookId } from "./BookId";

describe("BookId", () => {
  describe("正常系", () => {
    it("有効なフォーマットの場合正しい変換結果を期待", () => {
      expect(new BookId("9784167158057").value).toBe("9784167158057");
      expect(new BookId("4167158051").value).toBe("4167158051");
    });

    it("isEqual", () => {
      const bookId1 = new BookId("9784167158057");
      const bookId2 = new BookId("9784167158057");
      const bookId3 = new BookId("9781234567890");
      expect(bookId1.isEqual(bookId2)).toBeTruthy();
      expect(bookId1.isEqual(bookId3)).toBeFalsy();
    });

    it("toISBN 13桁", () => {
      const bookId = new BookId("9784167158057");
      expect(bookId.toISBN()).toBe("ISBN978-4-16-715805-7");
    });

    it("toISBN 10桁", () => {
      const bookId = new BookId("4167158051");
      expect(bookId.toISBN()).toBe("ISBN4-16-715805-1");
    });
  });

  describe("異常系", () => {
    it("不正な文字数の場合にエラーを投げる", () => {
      // 境界値のテスト
      expect(() => new BookId("1".repeat(101))).toThrow(
        "不正な ISBN の形式です"
      );
      expect(() => new BookId("1".repeat(9))).toThrow("不正な ISBN の形式です");
    });

    it("不正なフォーマットの場合にエラーを投げる", () => {
      expect(() => new BookId("9994167158057")).toThrow(
        "不正な ISBN の形式です"
      );
    });
  });
});
