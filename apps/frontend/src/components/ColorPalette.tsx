"use client";

import { Box, Typography, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const ColorPalette = () => {
  const theme = useTheme();

  const colorSamples = [
    {
      name: "アクセントカラー",
      value: theme.colors.accent,
      description: "ボタンやヘッダーに使用",
    },
    {
      name: "ベースカラー",
      value: theme.colors.base,
      description: "背景色として使用",
    },
    {
      name: "テキストカラー",
      value: theme.colors.text,
      description: "メインテキストに使用",
    },
  ];

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
        カラーパレット設定
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {colorSamples.map((color) => (
          <Box
            key={color.name}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              borderRadius: 1,
              backgroundColor: "background.default",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: color.value,
                borderRadius: 1,
                border: "1px solid #e0e0e0",
                flexShrink: 0,
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {color.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {color.value.toUpperCase()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {color.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 3, p: 2, backgroundColor: "grey.100", borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          💡 これらの色は apps/frontend/src/app/providers.tsx で定義されており、
          アプリ全体で一貫して使用されます。
        </Typography>
      </Box>
    </Paper>
  );
};
