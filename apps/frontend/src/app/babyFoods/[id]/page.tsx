"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  Rating,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { PageContainer } from "@/components/CenteredLayout";
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

export default function BabyFoodDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [babyFood, setBabyFood] = useState<BabyFood>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchBabyFood = async () => {
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

    fetchBabyFood();
  }, [resolvedParams.id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/baby-foods/${resolvedParams.id}`);
      console.log("削除しました");
      router.push("/babyFoods");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "削除中にエラーが発生しました"
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

  return (
    <PageContainer>
      <Paper elevation={3} sx={{ p: 4, position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => router.push(`/babyFoods/${resolvedParams.id}/edit`)}
          >
            編集
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setDeleteDialogOpen(true)}
          >
            削除
          </Button>
        </Box>

        <Typography variant="h6" sx={{ mb: 1 }}>
          食べ物名
        </Typography>
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
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
              <Typography variant="h6" sx={{ mb: 1 }}>
                反応
              </Typography>
              <Rating value={babyFood?.reactionStars} readOnly size="large" />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                メモ
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {babyFood?.memo || "メモはありません"}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
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

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>食べ物の削除</DialogTitle>
        <DialogContent>
          <Typography>
            「{babyFood?.name}」を削除してもよろしいですか？
            この操作は取り消せません。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>キャンセル</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}
