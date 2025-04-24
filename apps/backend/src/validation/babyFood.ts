import { z } from "zod";
import { idParamSchema } from "./common";
import { ingredientIdsSchema } from "./ingredient";

/** 食べ物名称のバリデーション */
export const babyFoodNameSchema = z
  .string()
  .min(1, "食べ物名は必須です")
  .max(50, "食べ物名は50文字以内で入力してください")
  .regex(/^[^\s].*[^\s]$/, "食べ物名の先頭と末尾にスペースは使用できません");

/** 評価のバリデーション */
export const reactionStarsSchema = z
  .number()
  .int("評価は整数で入力してください")
  .min(1, "評価は1以上で入力してください")
  .max(5, "評価は5以下で入力してください");

/** メモのバリデーション */
export const memoSchema = z
  .string()
  .max(200, "メモは200文字以内で入力してください")
  .optional();

/** 食べ物情報作成 */
export const babyFoodCreateSchema = z.object({
  name: babyFoodNameSchema,
  ingredientIds: ingredientIdsSchema,
  reactionStars: reactionStarsSchema,
  memo: memoSchema,
});

/** 食べ物情報作成リクエスト */
export const BabyFoodCreateRequestSchema = z.object({
  body: babyFoodCreateSchema,
});

/** 食べ物情報編集 */
export const babyFoodUpdateSchema = z.object({
  name: babyFoodNameSchema.optional(),
  ingredientIds: ingredientIdsSchema.optional(),
  reactionStars: reactionStarsSchema.optional(),
  memo: memoSchema.optional(),
});

/** 食べ物情報編集リクエスト */
export const BabyFoodUpdateRequestSchema = z.object({
  body: babyFoodUpdateSchema,
  params: idParamSchema.shape.params,
});
