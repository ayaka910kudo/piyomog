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
        <Typography
          variant="h6"
          component="h1"
          sx={{
            fontWeight: "bold",
            flexGrow: 1,
          }}
        >
          {title}
        </Typography>

        {showHomeButton && (
          <Box>
            <Tooltip title="ホームに戻る" arrow>
              <IconButton
                onClick={handleHomeClick}
                size="medium"
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
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
