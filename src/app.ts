import express, { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
import { validateRequest } from "./middleware";
import {
  BabyFoodCreateRequestSchema,
  BabyFoodUpdateRequestSchema,
} from "./validation";
const prisma = new PrismaClient();

// Expressの初期化
const app = express();

// JSONパーサーの追加
app.use(express.json());

// ルートAPI
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 食べ物一覧取得
app.get("/api/baby-foods", async (req, res) => {
  try {
    const babyFoods = await prisma.babyFood.findMany();
    res.json(babyFoods);
  } catch (error) {
    console.error("エラーの詳細:", error);
    res.status(500).json({ error: "データの取得に失敗しました" });
  }
});

// 食べ物情報取得
app.get("/api/baby-foods/:id", async (req, res) => {
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

//  原材料一覧取得
app.get("/api/ingredients", async (req, res) => {
  try {
    const ingredients = await prisma.ingredient.findMany();

    res.json(ingredients);
  } catch (error) {
    console.error("エラーの詳細:", error);
    res.status(500).json({ error: "データの取得に失敗しました" });
  }
});

// 原材料追加
app.post("/api/ingredients", async (req, res: any) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "原材料名が必要です" });
    }

    await prisma.ingredient.create({
      data: { name: name },
    });

    res.status(201).json({ message: "原材料を追加しました" });
  } catch (error) {
    console.error("エラーの詳細:", error);
    res.status(500).json({ error: "原材料の追加に失敗しました" });
  }
});

// 原材料削除
app.delete("/api/ingredients/:id", async (req, res: any) => {
  try {
    const ingredient = await prisma.ingredient.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!ingredient) {
      return res
        .status(404)
        .json({ error: "指定された原材料が見つかりません" });
    }

    await prisma.ingredient.delete({
      where: { id: Number(req.params.id) },
    });

    res.status(200).json({ message: "原材料を削除しました" });
  } catch (error) {
    console.error("エラーの詳細:", error);
    res.status(500).json({ error: "原材料の削除に失敗しました" });
  }
});

// 原材料名の修正
app.patch("/api/ingredients/:id", async (req, res: any) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "原材料名が必要です" });
    }

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
});

// 食べ物情報追加
app.post(
  "/api/baby-foods",
  validateRequest(BabyFoodCreateRequestSchema),
  async (req, res: any) => {
    try {
      const { name, ingredientIds, reactionStars, memo } = req.body;

      if (!name) {
        return res.status(400).json({ error: "食べ物の名前が必要です" });
      }

      if (!Array.isArray(ingredientIds) || ingredientIds.length === 0) {
        return res
          .status(400)
          .json({ error: "少なくとも1つの原材料を指定してください" });
      }

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

// 食べ物情報の編集
app.patch(
  "/api/baby-foods/:id",
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
      if (
        ingredientIds &&
        Array.isArray(ingredientIds) &&
        ingredientIds.length > 0
      ) {
        updateData.ingredients = {
          set: [], // 一旦すべての関連を解除
          connect: ingredientIds.map((id: number) => ({ id })), // 新しい関連を設定
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

// 食べ物情報の削除
app.delete("/api/baby-foods/:id", async (req, res: any) => {
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

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
