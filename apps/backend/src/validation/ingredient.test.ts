import {
  ingredientIdsSchema,
  ingredientNameSchema,
  IngredientCreateRequestSchema,
  IngredientUpdateRequestSchema,
} from "./ingredient";

describe("ingredientIdsSchema", () => {
  it("正しい原材料ID配列を検証できること", () => {
    const result = ingredientIdsSchema.safeParse([1, 2, 3]);
    expect(result.success).toBe(true);
  });

  it("空配列を拒否すること", () => {
    const result = ingredientIdsSchema.safeParse([]);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "少なくとも1つの原材料を指定してください"
      );
    }
  });

  it("10個を超える原材料ID配列を拒否すること", () => {
    const result = ingredientIdsSchema.safeParse([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    ]);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "原材料は最大10個まで指定できます"
      );
    }
  });
});

describe("ingredientNameSchema", () => {
  it("正しい原材料名を検証できること", () => {
    const result = ingredientNameSchema.safeParse("トマト");
    expect(result.success).toBe(true);
  });

  it("空文字列を拒否すること", () => {
    const result = ingredientNameSchema.safeParse("");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("原材料名は必須です");
    }
  });

  it("30文字を超える原材料名を拒否すること", () => {
    const result = ingredientNameSchema.safeParse("a".repeat(31));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "原材料名は30文字以内で入力してください"
      );
    }
  });
});

describe("IngredientCreateRequestSchema", () => {
  it("正しい作成リクエストを検証できること", () => {
    const result = IngredientCreateRequestSchema.safeParse({
      body: {
        name: "トマト",
      },
    });
    expect(result.success).toBe(true);
  });

  it("原材料名が欠落しているリクエストを拒否すること", () => {
    const result = IngredientCreateRequestSchema.safeParse({
      body: {},
    });
    expect(result.success).toBe(false);
  });

  it("bodyが欠落しているリクエストを拒否すること", () => {
    const result = IngredientCreateRequestSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("IngredientUpdateRequestSchema", () => {
  it("正しい更新リクエストを検証できること", () => {
    const result = IngredientUpdateRequestSchema.safeParse({
      body: {
        name: "トマト",
      },
      params: {
        id: "123",
      },
    });
    expect(result.success).toBe(true);
  });

  it("原材料名が欠落している更新リクエストを拒否すること", () => {
    const result = IngredientUpdateRequestSchema.safeParse({
      body: {},
      params: {
        id: "123",
      },
    });
    expect(result.success).toBe(false);
  });

  it("paramsが欠落している更新リクエストを拒否すること", () => {
    const result = IngredientUpdateRequestSchema.safeParse({
      body: {
        name: "トマト",
      },
    });
    expect(result.success).toBe(false);
  });

  it("bodyが欠落している更新リクエストを拒否すること", () => {
    const result = IngredientUpdateRequestSchema.safeParse({
      params: {
        id: "123",
      },
    });
    expect(result.success).toBe(false);
  });
});
