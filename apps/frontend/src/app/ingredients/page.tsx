"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Box,
  CircularProgress,
  Alert,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import axios from "axios";

interface Ingredient {
  id: number;
  name: string;
}

interface ErrorDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

function ErrorDialog({ open, onClose, message }: ErrorDialogProps) {
  console.log("ErrorDialog rendering with message:", message);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>エラー</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);
  const [newName, setNewName] = useState("");
  const [createName, setCreateName] = useState("");

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get("/api/ingredients");
      setIngredients(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "原材料の取得に失敗しました"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setNewName(ingredient.name);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    if (!confirm("この原材料を削除してもよろしいですか？")) return;

    try {
      const response = await axios.delete(`/api/ingredients/${id}`);
      if (response.data.message) {
        fetchIngredients();
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errorData = err.response.data;
        if (errorData.usedIn) {
          const usedInList = errorData.usedIn
            .map((food: { name: string }) => food.name)
            .join("、");
          setErrorMessage(
            `この原材料は以下の離乳食で使用されているため削除できません：${usedInList}`
          );
        } else {
          setErrorMessage("原材料の削除に失敗しました");
        }
        setErrorDialogOpen(true);
      } else {
        setErrorMessage("原材料の削除に失敗しました");
        setErrorDialogOpen(true);
      }
    }
  };

  const handleErrorDialogClose = () => {
    setErrorDialogOpen(false);
    fetchIngredients();
  };

  const handleEditSubmit = async () => {
    if (!selectedIngredient) return;

    try {
      await axios.patch(`/api/ingredients/${selectedIngredient.id}`, {
        name: newName,
      });
      setEditDialogOpen(false);
      fetchIngredients();
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "原材料の更新に失敗しました"
      );
      setErrorDialogOpen(true);
    }
  };

  const handleCreateClick = () => {
    setCreateName("");
    setCreateDialogOpen(true);
  };

  const handleCreateSubmit = async () => {
    try {
      const response = await axios.post("/api/ingredients", {
        name: createName,
      });
      if (response.data) {
        setCreateDialogOpen(false);
        fetchIngredients();
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(
          err.response.data.error || "原材料の作成に失敗しました"
        );
      } else {
        setErrorMessage("原材料の作成に失敗しました");
      }
      setErrorDialogOpen(true);
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
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4" component="h1">
            原材料一覧
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateClick}
          >
            新規作成
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>原材料名</TableCell>
                <TableCell align="right">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell>{ingredient.id}</TableCell>
                  <TableCell>{ingredient.name}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleEditClick(ingredient)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteClick(ingredient.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>原材料名の編集</DialogTitle>
        <DialogContent>
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
            label="原材料名"
            fullWidth
            required
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>キャンセル</Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            color="primary"
            disabled={!newName.trim()}
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
      >
        <DialogTitle>原材料の新規作成</DialogTitle>
        <DialogContent>
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
            label="原材料名"
            fullWidth
            required
            value={createName}
            onChange={(e) => setCreateName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>キャンセル</Button>
          <Button
            onClick={handleCreateSubmit}
            variant="contained"
            color="primary"
            disabled={!createName.trim()}
          >
            作成
          </Button>
        </DialogActions>
      </Dialog>

      <ErrorDialog
        open={errorDialogOpen}
        onClose={handleErrorDialogClose}
        message={errorMessage}
      />
    </Container>
  );
}
