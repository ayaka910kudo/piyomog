"use client";

import { IconButton, Tooltip } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface HomeButtonProps {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "default";
}

export const HomeButton = ({
  size = "medium",
  color = "primary",
}: HomeButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <Tooltip title="ホームに戻る" arrow>
      <IconButton
        onClick={handleClick}
        size={size}
        color={color}
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(4px)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          },
        }}
      >
        <HomeIcon />
      </IconButton>
    </Tooltip>
  );
};
