import { z } from "zod";

/** 共通のIDパラメータバリデーション */
export const idParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "IDは数値で入力してください"),
  }),
});
