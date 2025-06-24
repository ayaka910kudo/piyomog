"use client";

import { Container, Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import InventoryIcon from "@mui/icons-material/Inventory";

export default function Home() {
  const router = useRouter();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          piyomog
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
          gap: 3,
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<RestaurantIcon />}
          onClick={() => router.push("/babyFoods")}
          sx={{ height: "100px", fontSize: "1.1rem" }}
        >
          食べ物一覧
        </Button>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<InventoryIcon />}
          onClick={() => router.push("/ingredients")}
          sx={{ height: "100px", fontSize: "1.1rem" }}
        >
          原材料一覧
        </Button>
      </Box>
    </Container>
  );
}
