import { z } from "zod";

export const idParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "IDは数値で入力してください"),
  }),
});

// 食べ物情報のバリデーション
export const babyFoodNameSchema = z
  .string()
  .min(1, "食べ物名は必須です")
  .max(50, "食べ物名は50文字以内で入力してください")
  .regex(/^[^\s].*[^\s]$/, "食べ物名の先頭と末尾にスペースは使用できません");

export const ingredientIdsSchema = z
  .array(z.number())
  .min(1, "少なくとも1つの原材料を指定してください")
  .max(10, "原材料は最大10個まで指定できます");

export const reactionStarsSchema = z
  .number()
  .int("評価は整数で入力してください")
  .min(1, "評価は1以上で入力してください")
  .max(5, "評価は5以下で入力してください");

export const memoSchema = z
  .string()
  .max(200, "メモは200文字以内で入力してください")
  .optional();

// 食べ物情報作成
export const babyFoodCreateSchema = z.object({
  name: babyFoodNameSchema,
  ingredientIds: ingredientIdsSchema,
  reactionStars: reactionStarsSchema,
  memo: memoSchema,
});

export const BabyFoodCreateRequestSchema = z.object({
  body: babyFoodCreateSchema,
});

// 食べ物情報編集
export const babyFoodUpdateSchema = z.object({
  name: babyFoodNameSchema.optional(),
  ingredientIds: ingredientIdsSchema.optional(),
  reactionStars: reactionStarsSchema.optional(),
  memo: memoSchema.optional(),
});

export const BabyFoodUpdateRequestSchema = z.object({
  body: babyFoodUpdateSchema,
  params: idParamSchema.shape.params,
});

// 原材料名のバリデーション
export const ingredientNameSchema = z
  .string({ message: "数字は使用できません" })
  .min(1, "原材料名は必須です")
  .max(30, "原材料名は30文字以内で入力してください");

// 原材料作成リクエスト
export const IngredientCreateRequestSchema = z.object({
  body: z.object({
    name: ingredientNameSchema,
  }),
});

// 原材料修正リクエスト
export const IngredientUpdateRequestSchema = z.object({
  body: z.object({
    name: ingredientNameSchema,
  }),
  params: idParamSchema.shape.params,
});
