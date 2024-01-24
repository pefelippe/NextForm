"use client";
import { QueryClient, QueryClientProvider } from "react-query";

import Form from "./components/form";
export default function Home() {
  const queryClient = new QueryClient();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  bg-white">
      <QueryClientProvider client={queryClient}>
        <Form />
      </QueryClientProvider>
    </main>
  );
}
