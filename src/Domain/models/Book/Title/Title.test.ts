import { Title } from "./Title";

describe("Title", () => {
  describe("正常系", () => {
    it("Title が 1 文字で作成できる", () => {
      expect(new Title("a").value).toBe("a");
    });

    it("Title が 1000 文字で作成できる", () => {
      const longTitle = "a".repeat(1000);
      expect(new Title(longTitle).value).toBe(longTitle);
    });
  });

  describe("異常系", () => {
    it("最小長以上の値で Title を生成するとエラーを投げる", () => {
      expect(() => new Title("")).toThrow(
        `タイトルは ${Title.MIN_LENGTH} 文字以上、 ${Title.MAX_LENGTH} 文字以下でなければなりません。`
      );
    });

    it("最大長以上の値で Title を生成するとエラーを投げる", () => {
      const tooLongTitle = "a".repeat(1001);
      expect(() => new Title(tooLongTitle)).toThrow(
        `タイトルは ${Title.MIN_LENGTH} 文字以上、 ${Title.MAX_LENGTH} 文字以下でなければなりません。`
      );
    });
  });
});
