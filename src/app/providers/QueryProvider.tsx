import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type PropsWithChildren } from "react";

export default function QueryProvider({ children }: PropsWithChildren) {

    const [client] = useState(() => new QueryClient({
        defaultOptions: {
            queries: { retry: 1, refetchOnWindowFocus: false },
            mutations: { retry: 0 }
        },
    }))

    return (
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}