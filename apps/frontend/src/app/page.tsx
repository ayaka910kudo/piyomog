"use client";

import { Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import InventoryIcon from "@mui/icons-material/Inventory";

export default function Home() {
  const router = useRouter();

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={4}
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            // backgroundColor: yellow[200],
            padding: 2,
            textAlign: "center",
            width: "80%",
            maxWidth: "800px",
            borderRadius: 1,
            margin: "0 auto",
          }}
        >
          piyomog
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={4}
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            // backgroundColor: yellow[200],
            padding: 2,
            textAlign: "center",
            width: "80%",
            maxWidth: "800px",
            borderRadius: 1,
            margin: "0 auto",
          }}
        >
          アプリの説明文
          このアプリは、ベビーの食べ物と原材料を管理するためのアプリです。
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
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
            width: "80%",
            // backgroundColor: yellow[100],
            padding: 2,
            borderRadius: 1,
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
      </Box>
    </Box>
  );
}
