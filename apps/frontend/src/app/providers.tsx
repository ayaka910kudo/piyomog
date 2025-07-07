"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// プロジェクト共通のカラーパレット
const colors = {
  accent: "#DC9F95", // アクセントカラー（ピンクベージュ）
  base: "#FFF6EE", // ベースカラー（クリーム色）
  text: "#664B4F", // テキストカラー（ダークブラウン）
} as const;

const theme = createTheme({
  colors, // カスタムカラーをテーマに追加
  palette: {
    primary: {
      main: colors.accent, // プライマリカラーをアクセントカラーに
      contrastText: "#ffffff", // プライマリカラー上のテキストは白
    },
    background: {
      default: colors.base, // 背景をベースカラーに
      paper: "#ffffff", // カード背景は白を維持
    },
    text: {
      primary: colors.text, // メインテキストをカスタムテキストカラーに
      secondary: colors.text + "99", // セカンダリテキストは透明度を下げる
    },
    // カスタムカラーを追加（TypeScript型拡張が必要）
    grey: {
      50: colors.base, // グレー50をベースカラーに置き換え
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  typography: {
    fontFamily: [
      '"Hiragino Kaku Gothic ProN"',
      '"Hiragino Sans"',
      '"Meiryo"',
      "sans-serif",
    ].join(","),
    // テキストカラーをデフォルトに設定
    allVariants: {
      color: colors.text,
    },
  },
  components: {
    // AppBarのスタイルを調整
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.accent,
          color: "#ffffff",
        },
      },
    },
    // Buttonのスタイルを調整
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none", // ボタンテキストの大文字変換を無効化
          fontWeight: 600,
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(220, 159, 149, 0.3)",
          },
        },
      },
    },
  },
});

// カスタムカラーをエクスポート（他のコンポーネントでも使用可能）
export { colors };

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
