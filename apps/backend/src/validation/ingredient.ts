import { z } from "zod";
import { idParamSchema } from "./common";

/** 原材料IDのバリデーション */
export const ingredientIdsSchema = z
  .array(z.number().int().positive("原材料IDは1以上の整数で入力してください"))
  .min(1, "少なくとも1つの原材料を指定してください")
  .max(10, "原材料は最大10個まで指定できます");

/** 原材料名のバリデーション */
export const ingredientNameSchema = z
  .string()
  .min(1, "原材料名は必須です")
  .max(30, "原材料名は30文字以内で入力してください")
  .regex(
    /^[^\s].*[^\s]$|^[^\s]$/,
    "原材料名の先頭と末尾にスペースは使用できません"
  );

/** 原材料作成リクエスト */
export const IngredientCreateRequestSchema = z.object({
  body: z.object({
    name: ingredientNameSchema,
  }),
});

/** 原材料修正リクエスト */
export const IngredientUpdateRequestSchema = z.object({
  body: z.object({
    name: ingredientNameSchema,
  }),
  params: idParamSchema.shape.params,
});
