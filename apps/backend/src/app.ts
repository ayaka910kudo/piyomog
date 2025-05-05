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

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
