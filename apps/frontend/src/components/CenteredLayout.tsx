"use client";

import { Box, Paper } from "@mui/material";
import { ReactNode } from "react";

interface CenteredLayoutProps {
  children: ReactNode;
  gap?: number;
  mt?: number;
  mb?: number;
}

export const CenteredLayout = ({
  children,
  gap,
  mt = 4,
  mb = 4,
}: CenteredLayoutProps) => {
  return (
    <Box
      sx={{
        mt,
        mb,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        ...(gap && { gap }),
      }}
    >
      {children}
    </Box>
  );
};

interface CenteredContentProps {
  children: ReactNode;
  maxWidth?: string;
  width?: string;
  justifyContent?: string;
  textAlign?: string;
}

export const CenteredContent = ({
  children,
  maxWidth = "800px",
  width = "80%",
  justifyContent = "center",
  textAlign = "center",
}: CenteredContentProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100%",
        textAlign,
      }}
    >
      <Box
        sx={{
          width,
          maxWidth,
          margin: "0 auto",
          ...(justifyContent !== "center" && {
            display: "flex",
            justifyContent,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: string;
  width?: string;
}

export const PageContainer = ({
  children,
  maxWidth = "800px",
  width = "80%",
}: PageContainerProps) => {
  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width, maxWidth }}>{children}</Box>
    </Box>
  );
};

interface ContentCardProps {
  children: ReactNode;
  enableActions?: boolean;
}

export const ContentCard = ({
  children,
  enableActions = false,
}: ContentCardProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 5,
        ...(enableActions && { position: "relative" }),
      }}
    >
      {children}
    </Paper>
  );
};

interface ActionButtonsProps {
  children: ReactNode;
}

export const ActionButtons = ({ children }: ActionButtonsProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 20,
        right: 20,
        display: "flex",
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
};
