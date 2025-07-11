"use client";

import { useState, useEffect, use } from "react";
import {
  Box,
  CircularProgress,
  Alert,
  Typography,
  Chip,
  Rating,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PageContainer, ContentCard } from "@/components/CenteredLayout";

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

interface Ingredient {
  id: number;
  name: string;
}

export default function BabyFoodEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [babyFood, setBabyFood] = useState<BabyFood>();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [babyFoodResponse, ingredientsResponse] = await Promise.all([
          axios.get(`/api/baby-foods/${resolvedParams.id}`),
          axios.get("/api/ingredients"),
        ]);
        setBabyFood(babyFoodResponse.data);
        setIngredients(ingredientsResponse.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "予期せぬエラーが発生しました"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams.id]);

  const handleUpdate = async () => {
    if (!babyFood) return;

    // バリデーションチェック
    if (!babyFood.name.trim()) {
      setValidationError("食べ物名が未入力です");
      return;
    }
    if (babyFood.reactionStars === 0) {
      setValidationError("反応が未入力です");
      return;
    }
    if (babyFood.ingredients.length === 0) {
      setValidationError("原材料が未入力です");
      return;
    }

    setValidationError(null);
    try {
      await axios.patch(`/api/baby-foods/${resolvedParams.id}`, {
        name: babyFood.name,
        reactionStars: babyFood.reactionStars,
        memo: babyFood.memo,
        ingredientIds: babyFood.ingredients.map((ing) => ing.id),
      });
      router.push(`/babyFoods/${resolvedParams.id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "更新中にエラーが発生しました"
      );
    }
  };

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
      <PageContainer>
        <Alert severity="error">{error}</Alert>
      </PageContainer>
    );
  }

  if (!babyFood) {
    return (
      <PageContainer>
        <Alert severity="error">食べ物が見つかりません</Alert>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentCard>
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          食べ物の編集
        </Typography>

        {validationError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {validationError}
          </Alert>
        )}

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 3, display: "block" }}
        >
          * は必須項目です
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            mt: 2,
          }}
        >
          <Box>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                食べ物名 *
              </Typography>
              <TextField
                fullWidth
                label="食べ物名"
                required
                value={babyFood.name}
                onChange={(e) =>
                  setBabyFood({ ...babyFood, name: e.target.value })
                }
                sx={{ mt: 1 }}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                反応 *
              </Typography>
              <Rating
                value={babyFood.reactionStars}
                onChange={(_, value) =>
                  setBabyFood({ ...babyFood, reactionStars: value || 0 })
                }
                size="large"
                sx={{ mt: 1 }}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                メモ
              </Typography>
              <TextField
                fullWidth
                label="メモ"
                multiline
                rows={4}
                value={babyFood.memo || ""}
                onChange={(e) =>
                  setBabyFood({ ...babyFood, memo: e.target.value })
                }
                sx={{ mt: 1 }}
              />
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mb: 1.5 }}>
              使用食材
            </Typography>
            <Autocomplete
              multiple
              options={ingredients}
              getOptionLabel={(option) => option.name}
              value={babyFood.ingredients}
              onChange={(_, newValue) => {
                setBabyFood({ ...babyFood, ingredients: newValue });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="原材料"
                  placeholder="原材料を選択"
                  required
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...chipProps } = getTagProps({ index });
                  return <Chip key={key} label={option.name} {...chipProps} />;
                })
              }
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>

        <Box
          sx={{ mt: 5, display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <Button
            variant="outlined"
            onClick={() => router.push(`/babyFoods/${resolvedParams.id}`)}
          >
            キャンセル
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            disabled={
              !babyFood.name.trim() ||
              babyFood.reactionStars === 0 ||
              babyFood.ingredients.length === 0
            }
          >
            更新
          </Button>
        </Box>
      </ContentCard>
    </PageContainer>
  );
}
