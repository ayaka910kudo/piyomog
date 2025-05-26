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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Chip,
  Autocomplete,
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

interface Ingredient {
  id: number;
  name: string;
}

export default function BabyFoodsPage() {
  const [babyFoods, setBabyFoods] = useState<BabyFood[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newBabyFood, setNewBabyFood] = useState({
    name: "",
    reactionStars: 0,
    memo: "",
    ingredientIds: [] as number[],
  });
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [babyFoodsResponse, ingredientsResponse] = await Promise.all([
          axios.get("/api/baby-foods"),
          axios.get("/api/ingredients"),
        ]);
        setBabyFoods(babyFoodsResponse.data);
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
  }, [refreshTrigger]);

  const handleCreateClick = () => {
    setNewBabyFood({
      name: "",
      reactionStars: 0,
      memo: "",
      ingredientIds: [],
    });
    setCreateDialogOpen(true);
  };

  const handleCreateSubmit = async () => {
    // バリデーションチェック
    if (!newBabyFood.name.trim()) {
      setValidationError("食べ物名が未入力です");
      return;
    }
    if (newBabyFood.reactionStars === 0) {
      setValidationError("反応が未入力です");
      return;
    }
    if (newBabyFood.ingredientIds.length === 0) {
      setValidationError("原材料が未入力です");
      return;
    }

    setValidationError(null);
    try {
      await axios.post("/api/baby-foods", newBabyFood);
      setCreateDialogOpen(false);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "食べ物の作成に失敗しました"
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
          onClick={handleCreateClick}
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

      <Dialog
        open={createDialogOpen}
        onClose={() => {
          setCreateDialogOpen(false);
          setValidationError(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>食べ物の新規登録</DialogTitle>
        <DialogContent>
          {validationError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {validationError}
            </Alert>
          )}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 2, display: "block" }}
          >
            * は必須項目です
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="食べ物名"
            fullWidth
            required
            value={newBabyFood.name}
            onChange={(e) =>
              setNewBabyFood({ ...newBabyFood, name: e.target.value })
            }
          />
          <Box sx={{ mt: 2 }}>
            <Typography component="legend">反応 *</Typography>
            <Rating
              value={newBabyFood.reactionStars}
              onChange={(_, value) =>
                setNewBabyFood({ ...newBabyFood, reactionStars: value || 0 })
              }
            />
          </Box>
          <TextField
            margin="dense"
            label="メモ"
            fullWidth
            multiline
            rows={2}
            value={newBabyFood.memo}
            onChange={(e) =>
              setNewBabyFood({ ...newBabyFood, memo: e.target.value })
            }
          />
          <FormControl fullWidth margin="dense">
            <Autocomplete
              multiple
              options={ingredients}
              getOptionLabel={(option) => option.name}
              value={ingredients.filter((ingredient) =>
                newBabyFood.ingredientIds.includes(ingredient.id)
              )}
              onChange={(_, newValue) => {
                setNewBabyFood({
                  ...newBabyFood,
                  ingredientIds: newValue.map((ingredient) => ingredient.id),
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="原材料"
                  placeholder="原材料を検索"
                  required
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...chipProps } = getTagProps({ index });
                  return <Chip key={key} label={option.name} {...chipProps} />;
                })
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>キャンセル</Button>
          <Button
            onClick={handleCreateSubmit}
            variant="contained"
            color="primary"
            disabled={
              !newBabyFood.name.trim() ||
              newBabyFood.reactionStars === 0 ||
              newBabyFood.ingredientIds.length === 0
            }
          >
            作成
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
