"use client";

import { AppBar, Toolbar, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const Header = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0} // 0=影なし, 1=薄い影, 2=普通, 3=濃い影
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
