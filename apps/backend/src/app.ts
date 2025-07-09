import express from "express";
import babyFoodRouter from "./routers/babyfood";
import ingredientRouter from "./routers/ingredient";

// Expressの初期化
const app = express();

// JSONパーサーの追加
app.use(express.json());

// ルートAPI
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ルーティングの設定
app.use("/api/baby-foods", babyFoodRouter);
app.use("/api/ingredients", ingredientRouter);

// ポート設定（環境変数から取得、デフォルトは3001）
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
