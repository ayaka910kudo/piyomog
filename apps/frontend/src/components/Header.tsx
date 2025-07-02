"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface HeaderProps {
  title?: string;
}

export const Header = ({ title = "ぴよもぐ" }: HeaderProps) => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        backgroundColor: "primary.main",
        color: "white",
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Box
          onClick={handleLogoClick}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8,
            },
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <Image
            src="/images/logo.png"
            alt="ぴよもぐロゴ"
            width={120}
            height={40}
            style={{
              objectFit: "contain",
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
