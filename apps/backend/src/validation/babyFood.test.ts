import { babyFoodNameSchema } from "./babyFood";

describe("Validation", () => {
  describe("babyFoodNameSchema", () => {
    it("正しい食べ物名を検証できること", () => {
      const result = babyFoodNameSchema.safeParse("りんご");
      expect(result.success).toBe(true);
    });

    it("空文字列を拒否すること", () => {
      const result = babyFoodNameSchema.safeParse("");
      expect(result.success).toBe(false);
    });

    it("先頭と末尾のスペースを含む文字列を拒否すること", () => {
      const result = babyFoodNameSchema.safeParse(" りんご ");
      expect(result.success).toBe(false);
    });
  });
});
