import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "./providers/AuthProvider";
import { AppRoute } from "./routes";
import { socket } from "@/api/socket.service";

export function App() {
  useEffect(() => {
    if (socket.disconnected) socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

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
