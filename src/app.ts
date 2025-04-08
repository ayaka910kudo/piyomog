import express, { Request, Response } from "express";
import { initializeDatabase, getDatabase } from "./initializeDatabase";

// Expressの初期化
const app = express();

// JSONパーサーの追加
app.use(express.json());

// アプリケーション起動時にデータベース接続を確立
initializeDatabase();

// ルートAPI
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 食べ物一覧取得
app.get("/api/baby-foods", async (req, res) => {
  try {
    const db = getDatabase();
    const babyFoods = await db.all("SELECT * FROM baby_foods");
    res.json(babyFoods);
  } catch (error) {
    console.error("エラーの詳細:", error);
    res.status(500).json({ error: "データの取得に失敗しました" });
  }
});

// 食べ物詳細取得
app.get("/api/baby-foods/:id", async (req, res) => {
  try {
    const db = getDatabase();
    const babyFood = await db.get(
      `
      SELECT 
        baby_foods.*,
        GROUP_CONCAT(ingredients.name) as ingredients
      FROM baby_foods
      LEFT JOIN baby_foods_ingredients ON baby_foods.id = baby_foods_ingredients.baby_food_id
      LEFT JOIN ingredients ON baby_foods_ingredients.ingredient_id = ingredients.id
      WHERE baby_foods.id = ?
      GROUP BY baby_foods.id
    `,
      req.params.id
    );

    if (babyFood) {
      // ingredientsを配列に変換
      const response = {
        ...babyFood,
        ingredients: babyFood.ingredients
          ? babyFood.ingredients.split(",")
          : [],
      };
      res.json(response);
    } else {
      res.status(404).json({ error: "指定された食べ物が見つかりません" });
    }
  } catch (error) {
    console.error("エラーの詳細:", error);
    res.status(500).json({ error: "データの取得に失敗しました" });
  }
});

//  原材料一覧取得
app.get("/api/ingredients", async (req, res) => {
  try {
    const db = getDatabase();
    const ingredients = await db.all("SELECT * FROM ingredients");
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
    const db = getDatabase();
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "原材料名が必要です" });
    }

    await db.run("INSERT INTO ingredients (name) VALUES (?)", name);

    res.status(201).json({ message: "原材料を追加しました" });
  } catch (error) {
    console.error("エラーの詳細:", error);
    res.status(500).json({ error: "原材料の追加に失敗しました" });
  }
});

// 原材料削除
app.delete("/api/ingredients/:id", async (req, res: any) => {
  try {
    const db = getDatabase();
    const { id } = req.params;

    // 指定されたIDの原材料が存在するか確認
    const ingredient = await db.get(
      "SELECT * FROM ingredients WHERE id = ?",
      id
    );
    if (!ingredient) {
      return res
        .status(404)
        .json({ error: "指定された原材料が見つかりません" });
    }

    await db.run("DELETE FROM ingredients WHERE id = ?", id);

    res.status(200).json({ message: "原材料を削除しました" });
  } catch (error) {
    console.error("エラーの詳細:", error);
    res.status(500).json({ error: "原材料の削除に失敗しました" });
  }
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
