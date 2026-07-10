// ==========================================
// FILE: src/app/_providers/trpc-provider.tsx
// PRIMARY DEVELOPER: Yuvaraj (Frontend UI/UX Engineer)
// CO-DEVELOPERS / COLLABORATORS: Godfrey (RSC & APIs), Santosh (E2E Testing)
// FOCUS: Providers wrap, QueryClient instantiations, tRPC React context
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Initialize a single TanStack `QueryClient` preventing HMR leak runs.
// 2. Wrap children elements inside both `trpc.Provider` and `QueryClientProvider` blocks.
// 3. Configure HTTP link transport options sending cookies and session headers.
// ==========================================

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import { trpc, getBaseUrl } from "@/utils/trpc";

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 5 * 1000, // 5 seconds cache stale threshold
      },
    },
  }));

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          // Add custom request headers logic here (e.g. Auth Tokens)
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
