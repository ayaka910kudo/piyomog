import { idParamSchema } from "./common";

describe("idParamSchema", () => {
  it("正しいIDパラメータを検証できること", () => {
    const result = idParamSchema.safeParse({
      params: {
        id: "123",
      },
    });
    expect(result.success).toBe(true);
  });

  it("数値以外のIDを拒否すること", () => {
    const result = idParamSchema.safeParse({
      params: {
        id: "abc",
      },
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("IDは数値で入力してください");
    }
  });

  it("IDパラメータが欠落している場合に拒否すること", () => {
    const result = idParamSchema.safeParse({
      params: {},
    });
    expect(result.success).toBe(false);
  });

  it("paramsオブジェクトが欠落している場合に拒否すること", () => {
    const result = idParamSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("空文字列のIDを拒否すること", () => {
    const result = idParamSchema.safeParse({
      params: {
        id: "",
      },
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("IDは数値で入力してください");
    }
  });

  it("小数点を含むIDを拒否すること", () => {
    const result = idParamSchema.safeParse({
      params: {
        id: "123.45",
      },
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("IDは数値で入力してください");
    }
  });

  it("負の数のIDを拒否すること", () => {
    const result = idParamSchema.safeParse({
      params: {
        id: "-123",
      },
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("IDは数値で入力してください");
    }
  });
});
