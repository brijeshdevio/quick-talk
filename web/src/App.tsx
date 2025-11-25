import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "@/routes";
import "@/App.css";
import { Toaster } from "sonner";

function App() {
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
