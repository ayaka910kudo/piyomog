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

  it("重複する原材料IDを含む配列を検証できること", () => {
    const result = ingredientIdsSchema.safeParse([1, 1, 2, 2, 3]);
    expect(result.success).toBe(true);
  });

  it("0以下の原材料IDを含む配列を拒否すること", () => {
    const result = ingredientIdsSchema.safeParse([0, 1, 2]);
    expect(result.success).toBe(false);
  });

  it("小数点を含む原材料IDを含む配列を拒否すること", () => {
    const result = ingredientIdsSchema.safeParse([1.5, 2, 3]);
    expect(result.success).toBe(false);
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

  it("先頭にスペースがある原材料名を拒否すること", () => {
    const result = ingredientNameSchema.safeParse(" トマト");
    expect(result.success).toBe(false);
  });

  it("末尾にスペースがある原材料名を拒否すること", () => {
    const result = ingredientNameSchema.safeParse("トマト ");
    expect(result.success).toBe(false);
  });

  it("全角スペースを含む原材料名を検証できること", () => {
    const result = ingredientNameSchema.safeParse("トマト　ジュース");
    expect(result.success).toBe(true);
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

  it("bodyがnullのリクエストを拒否すること", () => {
    const result = IngredientCreateRequestSchema.safeParse({
      body: null,
    });
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

  it("bodyがnullの更新リクエストを拒否すること", () => {
    const result = IngredientUpdateRequestSchema.safeParse({
      body: null,
      params: {
        id: "123",
      },
    });
    expect(result.success).toBe(false);
  });
});
