import { Box, Container, Typography, Button, Stack } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Stack spacing={4} alignItems="center">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />

          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Next.js with MUI
          </Typography>

          <Stack spacing={2}>
            <Typography>
              1. Get started by editing <code>src/app/page.tsx</code>
            </Typography>
            <Typography>2. Save and see your changes instantly.</Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deploy now
            </Button>
            <Button
              variant="outlined"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
