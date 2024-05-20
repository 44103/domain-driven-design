import { Status, StatusEnum } from "./Status";

describe("Status", () => {
  describe("正常系", () => {
    it("有効なステータスでインスタンスが生成されること", () => {
      expect(new Status(StatusEnum.InStock).value).toBe(StatusEnum.InStock);
      expect(new Status(StatusEnum.OutOfStock).value).toBe(
        StatusEnum.OutOfStock
      );
      expect(new Status(StatusEnum.LowStock).value).toBe(StatusEnum.LowStock);
    });

    describe("toLabel", () => {
      it("ステータス InStock が「在庫あり」に変換されること", () => {
        const status = new Status(StatusEnum.InStock);
        expect(status.toLabel()).toBe("在庫あり");
      });

      it("ステータス OutOfStock が「在庫切れ」に変換されること", () => {
        const status = new Status(StatusEnum.OutOfStock);
        expect(status.toLabel()).toBe("在庫切れ");
      });

      it("ステータス LowStock が「残りわずか」に変換されること", () => {
        const status = new Status(StatusEnum.LowStock);
        expect(status.toLabel()).toBe("残りわずか");
      });
    });
  });

  describe("異常系", () => {
    it("無効なステータスでエラーが投げられること", () => {
      const invalidStatus = "invalid" as StatusEnum; // テストのために無効な値を渡す
      expect(() => new Status(invalidStatus)).toThrow("無効なステータスです。");
    });
  });
});
