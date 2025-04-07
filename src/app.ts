import * as express from "express";
import { initializeDatabase, getDatabase } from "./initializeDatabase";

// Expressの初期化
const app = express();

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

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
