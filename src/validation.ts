import { z } from "zod";

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
