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
  showHomeButton?: boolean;
}

export const Header = ({
  title = "ぴよもぐ",
  showHomeButton = true,
}: HeaderProps) => {
  const router = useRouter();

  const handleHomeClick = () => {
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
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
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

        {showHomeButton && (
          <Box>
            <Tooltip title="ホームに戻る" arrow>
              <IconButton
                onClick={handleHomeClick}
                size="medium"
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 0.1)",
                  },
                }}
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
