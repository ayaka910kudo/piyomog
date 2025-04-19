import { z } from "zod";

// 食べ物情報のバリデーション
export const babyFoodNameSchema = z.string().min(1).max(50);
export const ingredientIdsSchema = z.array(z.number());
export const reactionStarsSchema = z.number().min(1).max(5);
export const memoSchema = z.string().max(200).optional();

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
  params: z.object({
    id: z.string().regex(/^\d+$/, "IDは数値で入力してください"),
  }),
});
