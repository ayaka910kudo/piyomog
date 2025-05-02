"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Box,
  CircularProgress,
  Alert,
  Typography,
  Paper,
  Chip,
  Rating,
} from "@mui/material";
import axios from "axios";
import { use } from "react";

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

export default function BabyFoodDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [babyFood, setBabyFood] = useState<BabyFood>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBabyFoods = async () => {
      try {
        const response = await axios.get(
          `/api/baby-foods/${resolvedParams.id}`
        );
        console.log("response.data", response.data);
        setBabyFood(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "予期せぬエラーが発生しました"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBabyFoods();
  }, [resolvedParams.id]);

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
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {babyFood?.name}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
            mt: 3,
          }}
        >
          <Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                反応
              </Typography>
              <Rating
                value={babyFood?.reactionStars}
                readOnly
                size="large"
                sx={{ mb: 2 }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                メモ
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {babyFood?.memo || "メモはありません"}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              使用食材
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {babyFood?.ingredients.map((ingredient) => (
                <Chip
                  key={ingredient.id}
                  label={ingredient.name}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
