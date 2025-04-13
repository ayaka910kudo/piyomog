import express, { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
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

// 食べ物詳細取得
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

interface IngredientRequestBody {
  name: string;
}

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

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
