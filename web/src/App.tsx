import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Router } from "@/routes";
import { socket } from "./services/socket";
import "@/App.css";

function App() {
  useEffect(() => {
    if (socket.disconnected) socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <Router />
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;
