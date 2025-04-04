import * as express from "express";

const app = express();

// ルートAPI
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 食べ物一覧取得
app.get("/api/baby-foods", (req, res) => {
  const babyFoods = [
    {
      id: 1,
      name: "しらすとわかめのお粥",
      reactionStars: 3,
    },
    {
      id: 2,
      name: "やわらか肉じゃが",
      reactionStars: 2,
    },
  ];
  res.json(babyFoods);
});

// 食べ物詳細取得
app.get("/api/baby-foods/:id", (req, res) => {
  const babyFood = {
    id: 1,
    name: "しらすとわかめのお粥",
    description: "",
    ingredients: ["米", "わかめ", "醤油"],
    reactionStars: 3,
    reactionMemo: "まずまず",
  };
  res.json(babyFood);
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
