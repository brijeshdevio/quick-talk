import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "./providers/AuthProvider";
import { AppRoute } from "./routes";

export function App() {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          <AppRoute />
        </AuthProvider>
      </QueryClientProvider>
      <Toaster />
    </>
  );
}
