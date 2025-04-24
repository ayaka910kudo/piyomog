import {
  babyFoodNameSchema,
  reactionStarsSchema,
  memoSchema,
  babyFoodCreateSchema,
  BabyFoodCreateRequestSchema,
  babyFoodUpdateSchema,
  BabyFoodUpdateRequestSchema,
} from "./babyFood";

describe("babyFoodNameSchema", () => {
  it("正しい食べ物名を検証できること", () => {
    const result = babyFoodNameSchema.safeParse("りんごジュース");
    expect(result.success).toBe(true);
  });

  it("空文字列を拒否すること", () => {
    const result = babyFoodNameSchema.safeParse("");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("食べ物名は必須です");
    }
  });

  it("50文字を超える食べ物名を拒否すること", () => {
    const result = babyFoodNameSchema.safeParse("a".repeat(51));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "食べ物名は50文字以内で入力してください"
      );
    }
  });

  it("先頭にスペースがある食べ物名を拒否すること", () => {
    const result = babyFoodNameSchema.safeParse(" りんごジュース");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "食べ物名の先頭と末尾にスペースは使用できません"
      );
    }
  });

  it("末尾にスペースがある食べ物名を拒否すること", () => {
    const result = babyFoodNameSchema.safeParse("りんごジュース ");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "食べ物名の先頭と末尾にスペースは使用できません"
      );
    }
  });
});

describe("reactionStarsSchema", () => {
  it("正しい評価を検証できること", () => {
    const result = reactionStarsSchema.safeParse(5);
    expect(result.success).toBe(true);
  });

  it("整数以外の評価を拒否すること", () => {
    const result = reactionStarsSchema.safeParse(3.5);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "評価は整数で入力してください"
      );
    }
  });

  it("1未満の評価を拒否すること", () => {
    const result = reactionStarsSchema.safeParse(0);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "評価は1以上で入力してください"
      );
    }
  });

  it("5を超える評価を拒否すること", () => {
    const result = reactionStarsSchema.safeParse(6);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "評価は5以下で入力してください"
      );
    }
  });
});

describe("memoSchema", () => {
  it("正しいメモを検証できること", () => {
    const result = memoSchema.safeParse("おいしかったです");
    expect(result.success).toBe(true);
  });

  it("未定義のメモを検証できること", () => {
    const result = memoSchema.safeParse(undefined);
    expect(result.success).toBe(true);
  });

  it("200文字を超えるメモを拒否すること", () => {
    const result = memoSchema.safeParse("a".repeat(201));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "メモは200文字以内で入力してください"
      );
    }
  });
});

describe("babyFoodCreateSchema", () => {
  it("正しい食べ物情報を作成できること", () => {
    const result = babyFoodCreateSchema.safeParse({
      name: "りんごジュース",
      ingredientIds: [1, 2],
      reactionStars: 5,
      memo: "おいしかったです",
    });
    expect(result.success).toBe(true);
  });

  it("メモなしで食べ物情報を作成できること", () => {
    const result = babyFoodCreateSchema.safeParse({
      name: "りんごジュース",
      ingredientIds: [1, 2],
      reactionStars: 5,
    });
    expect(result.success).toBe(true);
  });

  it("必須フィールドが欠落している場合に拒否すること", () => {
    const result = babyFoodCreateSchema.safeParse({
      name: "りんごジュース",
      reactionStars: 5,
    });
    expect(result.success).toBe(false);
  });
});

describe("BabyFoodCreateRequestSchema", () => {
  it("正しい作成リクエストを検証できること", () => {
    const result = BabyFoodCreateRequestSchema.safeParse({
      body: {
        name: "りんごジュース",
        ingredientIds: [1, 2],
        reactionStars: 5,
        memo: "おいしかったです",
      },
    });
    expect(result.success).toBe(true);
  });

  it("bodyが欠落しているリクエストを拒否すること", () => {
    const result = BabyFoodCreateRequestSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("babyFoodUpdateSchema", () => {
  it("正しい食べ物情報を更新できること", () => {
    const result = babyFoodUpdateSchema.safeParse({
      name: "りんごジュース",
      ingredientIds: [1, 2],
      reactionStars: 5,
      memo: "おいしかったです",
    });
    expect(result.success).toBe(true);
  });

  it("一部のフィールドのみで更新できること", () => {
    const result = babyFoodUpdateSchema.safeParse({
      name: "りんごジュース",
    });
    expect(result.success).toBe(true);
  });

  it("空の更新データを検証できること", () => {
    const result = babyFoodUpdateSchema.safeParse({});
    expect(result.success).toBe(true);
  });
});

describe("BabyFoodUpdateRequestSchema", () => {
  it("正しい更新リクエストを検証できること", () => {
    const result = BabyFoodUpdateRequestSchema.safeParse({
      body: {
        name: "りんごジュース",
        ingredientIds: [1, 2],
        reactionStars: 5,
        memo: "おいしかったです",
      },
      params: {
        id: "123",
      },
    });
    expect(result.success).toBe(true);
  });

  it("一部のフィールドのみで更新リクエストを検証できること", () => {
    const result = BabyFoodUpdateRequestSchema.safeParse({
      body: {
        name: "りんごジュース",
      },
      params: {
        id: "123",
      },
    });
    expect(result.success).toBe(true);
  });

  it("paramsが欠落している更新リクエストを拒否すること", () => {
    const result = BabyFoodUpdateRequestSchema.safeParse({
      body: {
        name: "りんごジュース",
      },
    });
    expect(result.success).toBe(false);
  });

  it("bodyが欠落している更新リクエストを拒否すること", () => {
    const result = BabyFoodUpdateRequestSchema.safeParse({
      params: {
        id: "123",
      },
    });
    expect(result.success).toBe(false);
  });
});
