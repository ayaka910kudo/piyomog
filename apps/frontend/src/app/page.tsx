"use client";

import { Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import InventoryIcon from "@mui/icons-material/Inventory";
import { CenteredLayout, CenteredContent } from "@/components/CenteredLayout";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <CenteredLayout gap={4}>
      <CenteredContent>
        <Box
          sx={{
            padding: 2,
            textAlign: "center",
          }}
        >
          <Image
            src="/images/kids.png"
            alt="子どもたちのイラスト"
            width={300}
            height={200}
            style={{
              objectFit: "contain",
            }}
          />
        </Box>
      </CenteredContent>

      <CenteredContent>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            padding: 2,
            textAlign: "center",
            borderRadius: 1,
            color: "text.primary",
          }}
        >
          アプリの説明文
          このアプリは、ベビーの食べ物と原材料を管理するためのアプリです。
        </Typography>
      </CenteredContent>

      <CenteredContent>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
            },
            gap: 3,
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
      </CenteredContent>
    </CenteredLayout>
  );
}
