import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import { ParliamentMemberProvider } from "../contexts/ParliamentMemberContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#264653",
    },
    secondary: {
      main: "#fff",
    },
  },
});

export const Providers: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ParliamentMemberProvider>{children}</ParliamentMemberProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
