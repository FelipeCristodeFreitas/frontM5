import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "Auth/Context/AuthContext";
import { FavoritoProvider } from "Favoritos/contexts/FavoritoContext";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";

const queryClient = new QueryClient();
function App() {
  return (
    <AuthProvider>

    <BrowserRouter>
    <FavoritoProvider>

      <QueryClientProvider client={queryClient}>

      <Router />
      </QueryClientProvider>
    </FavoritoProvider>
    </BrowserRouter>
    </AuthProvider>
  );

}

export default App;
