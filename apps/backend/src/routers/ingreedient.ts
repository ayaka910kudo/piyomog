import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { validateRequest } from "../middleware";
import {
  IngredientCreateRequestSchema,
  IngredientUpdateRequestSchema,
} from "../validation/ingredient";
import { idParamSchema } from "../validation/common";

const router = express.Router();
const prisma = new PrismaClient();

/** 原材料一覧取得 */
router.get("/", async (req, res) => {
  try {
    const ingredients = await prisma.ingredient.findMany();
    res.json(ingredients);
  } catch (error) {
    console.error("エラーの詳細:", error);
    res.status(500).json({ error: "データの取得に失敗しました" });
  }
});

/** 原材料追加 */
router.post(
  "/",
  validateRequest(IngredientCreateRequestSchema),
  async (req, res: any) => {
    try {
      const { name } = req.body;

      await prisma.ingredient.create({
        data: { name: name },
      });

      res.status(201).json({ message: "原材料を追加しました" });
    } catch (error) {
      console.error("エラーの詳細:", error);
      res.status(500).json({ error: "原材料の追加に失敗しました" });
    }
  }
);

/** 原材料削除 */
router.delete("/:id", validateRequest(idParamSchema), async (req, res: any) => {
  try {
    const ingredientId = Number(req.params.id);

    // 原材料が存在するか確認
    const ingredient = await prisma.ingredient.findUnique({
      where: { id: ingredientId },
    });

    if (!ingredient) {
      return res
        .status(404)
        .json({ error: "指定された原材料が見つかりません" });
    }

    // 原材料が離乳食で使用されているか確認
    const usedInBabyFoods = await prisma.babyFood.findMany({
      where: {
        ingredients: {
          some: {
            ingredientId: ingredientId,
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (usedInBabyFoods.length > 0) {
      return res.status(400).json({
        error: "この原材料は使用されているため削除できません",
        usedIn: usedInBabyFoods,
      });
    }

    // 使用されていない場合は削除を実行
    await prisma.ingredient.delete({
      where: { id: ingredientId },
    });

    res.status(200).json({ message: "原材料を削除しました" });
  } catch (error) {
    console.error("エラーの詳細:", error);
    res.status(500).json({ error: "原材料の削除に失敗しました" });
  }
});

/** 原材料名の修正 */
router.patch(
  "/:id",
  validateRequest(IngredientUpdateRequestSchema),
  async (req, res: any) => {
    try {
      const id = Number(req.params.id);
      const { name } = req.body;

      // 更新する原材料が存在するか確認
      const ingredient = await prisma.ingredient.findUnique({
        where: { id },
      });

      if (!ingredient) {
        return res
          .status(404)
          .json({ error: "指定された原材料が見つかりません" });
      }

      // 原材料名を更新
      const updatedIngredient = await prisma.ingredient.update({
        where: { id },
        data: { name },
      });

      res.json(updatedIngredient);
    } catch (error) {
      console.error("エラーの詳細:", error);
      res.status(500).json({ error: "原材料名の更新に失敗しました" });
    }
  }
);

export default router;
