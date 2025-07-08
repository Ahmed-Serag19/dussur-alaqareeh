import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "./i18n/index.ts";
import App from "./App.tsx";
import { AdminProvider } from "./context/AdminContext.tsx";
import "leaflet/dist/leaflet.css";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <App />
      </AdminProvider>
    </QueryClientProvider>
  </StrictMode>
);
