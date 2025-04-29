import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { validateRequest } from "../middleware";
import {
  BabyFoodCreateRequestSchema,
  BabyFoodUpdateRequestSchema,
} from "../validation/babyFood";
import { idParamSchema } from "../validation/common";

const router = express.Router();
const prisma = new PrismaClient();

/** 食べ物一覧取得 */
router.get("/", async (req, res) => {
  try {
    const babyFoods = await prisma.babyFood.findMany();
    res.json(babyFoods);
  } catch (error) {
    console.error("エラーの詳細:", error);
    res.status(500).json({ error: "データの取得に失敗しました" });
  }
});

/** 食べ物情報取得 */
router.get("/:id", validateRequest(idParamSchema), async (req, res) => {
  try {
    const babyFood = await prisma.babyFood.findUnique({
      where: { id: Number(req.params.id) },
      include: { ingredients: true },
    });

    res.json(babyFood);
  } catch (error) {
    console.error("エラーの詳細:", error);
    res.status(500).json({ error: "データの取得に失敗しました" });
  }
});

/** 食べ物情報追加 */
router.post(
  "/",
  validateRequest(BabyFoodCreateRequestSchema),
  async (req, res: any) => {
    try {
      const { name, ingredientIds, reactionStars, memo } = req.body;

      // 食べ物を作成し、関連する原材料も同時に設定
      const babyFood = await prisma.babyFood.create({
        data: {
          name: name,
          reactionStars: reactionStars ?? 0,
          memo: memo ?? "",
          ingredients: {
            connect: ingredientIds.map((id: number) => ({ id: id })),
          },
        },
        include: {
          ingredients: true,
        },
      });

      res.status(201).json(babyFood);
    } catch (error) {
      console.error("エラーの詳細:", error);
      res.status(500).json({ error: "食べ物情報の追加に失敗しました" });
    }
  }
);

/** 食べ物情報の編集 */
router.patch(
  "/:id",
  validateRequest(BabyFoodUpdateRequestSchema),
  async (req, res: any) => {
    try {
      const id = Number(req.params.id);
      const { name, ingredientIds, reactionStars, memo } = req.body;

      // 更新する食べ物が存在するか確認
      const babyFood = await prisma.babyFood.findUnique({
        where: { id },
        include: { ingredients: true },
      });

      if (!babyFood) {
        return res
          .status(404)
          .json({ error: "指定された食べ物が見つかりません" });
      }

      // 更新データの準備
      const updateData: any = {};

      // 送信されたプロパティのみを更新対象に含める
      if (name !== undefined) updateData.name = name;
      if (reactionStars !== undefined)
        updateData.reactionStars = Number(reactionStars);
      if (memo !== undefined) updateData.memo = memo;

      // 原材料の更新がある場合
      if (ingredientIds !== undefined) {
        // 既存の関連をすべて解除し、新しい関連を設定
        updateData.ingredients = {
          deleteMany: {}, // すべての関連を削除
          create: ingredientIds.map((id: number) => ({
            ingredient: {
              connect: { id },
            },
          })),
        };
      }

      // 食べ物情報を更新
      const updatedBabyFood = await prisma.babyFood.update({
        where: { id },
        data: updateData,
        include: {
          ingredients: true,
        },
      });

      res.json(updatedBabyFood);
    } catch (error) {
      console.error("エラーの詳細:", error);
      res.status(500).json({ error: "食べ物情報の更新に失敗しました" });
    }
  }
);

/** 食べ物情報の削除 */
router.delete("/:id", validateRequest(idParamSchema), async (req, res: any) => {
  try {
    const id = Number(req.params.id);

    // 削除する食べ物が存在するか確認
    const babyFood = await prisma.babyFood.findUnique({
      where: { id },
    });

    if (!babyFood) {
      return res
        .status(404)
        .json({ error: "指定された食べ物が見つかりません" });
    }

    // 食べ物を削除
    await prisma.babyFood.delete({
      where: { id },
    });

    res.status(200).json({ message: "食べ物を削除しました" });
  } catch (error) {
    console.error("エラーの詳細:", error);
    res.status(500).json({ error: "食べ物の削除に失敗しました" });
  }
});

export default router;
