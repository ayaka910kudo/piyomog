"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Rating,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import axios from "axios";

// 食べ物の型定義
interface BabyFood {
  id: number;
  name: string;
  reactionStars: number;
  memo: string;
  ingredients: {
    id: number;
    name: string;
  }[];
}

export default function BabyFoodsPage() {
  const [babyFoods, setBabyFoods] = useState<BabyFood[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBabyFoods = async () => {
      try {
        const response = await axios.get("/api/baby-foods");
        setBabyFoods(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "予期せぬエラーが発生しました"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBabyFoods();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          食べ物一覧
        </Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={4}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          href="/baby-foods/new"
        >
          新規登録
        </Button>
      </Box>

      {babyFoods.length === 0 ? (
        <Alert severity="info">登録された食べ物はありません</Alert>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 3,
          }}
        >
          {babyFoods.map((food) => (
            <Card key={food.id}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {food.name}
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography component="legend" mr={1}>
                    反応:
                  </Typography>
                  <Rating value={food.reactionStars} readOnly />
                </Box>
                {food.memo && (
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {food.memo}
                  </Typography>
                )}
                {food.ingredients && food.ingredients.length > 0 && (
                  <Typography variant="body2">
                    原材料: {food.ingredients.map((ing) => ing.name).join(", ")}
                  </Typography>
                )}
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    href={`/babyFoods/${food.id}`}
                  >
                    詳細
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}
