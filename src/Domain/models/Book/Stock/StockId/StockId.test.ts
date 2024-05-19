import { StockId } from "./StockId";

// nanoid() をモックする
jest.mock("nanoid", () => ({
  nanoid: () => "testIdWithExactLength",
}));

describe("StockId", () => {
  describe("正常系", () => {
    it("デフォルトの値で StockId を生成する", () => {
      const stockId = new StockId();
      expect(stockId.value).toBe("testIdWithExactLength");
    });

    it("指定された値で StockId を生成する", () => {
      const value = "customId";
      const stockId = new StockId(value);
      expect(stockId.value).toBe(value);
    });
  });

  describe("異常系", () => {
    it("最小長以下の値で StockId を生成するとエラーを投げる", () => {
      const shortValue = "";
      expect(() => new StockId(shortValue)).toThrow(
        new Error(
          `StockId は ${StockId.MIN_LENGTH} 文字以上、 ${StockId.MAX_LENGTH} 文字以下でなければなりません。`
        )
      );
    });

    it("最大長以上の値で StockId を生成するとエラーを投げる", () => {
      const longValue = "a".repeat(StockId.MAX_LENGTH + 1);
      expect(() => new StockId(longValue)).toThrow(
        new Error(
          `StockId は ${StockId.MIN_LENGTH} 文字以上、 ${StockId.MAX_LENGTH} 文字以下でなければなりません。`
        )
      );
    });
  });
});
