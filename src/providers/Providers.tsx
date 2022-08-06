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

export const Providers: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ParliamentMemberProvider>{children}</ParliamentMemberProvider>
    </QueryClientProvider>
  );
};
