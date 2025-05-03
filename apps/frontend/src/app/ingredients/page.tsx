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
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";

interface Ingredient {
  id: number;
  name: string;
}

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);
  const [newName, setNewName] = useState("");

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
      await axios.delete(`/api/ingredients/${id}`);
      fetchIngredients();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "原材料の削除に失敗しました"
      );
    }
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
      setError(
        err instanceof Error ? err.message : "原材料の更新に失敗しました"
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
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          原材料一覧
        </Typography>

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
          <TextField
            autoFocus
            margin="dense"
            label="原材料名"
            fullWidth
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
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
