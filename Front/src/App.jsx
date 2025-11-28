import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Produtos from "./pages/Ferramentas";
import Estoque from "./pages/Estoque";
import Navbar from "./components/Navbar";
import Ferramentas from "./pages/Produtos";
import EditarProduto from "./pages/EditarProduto";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
}

function AppContent() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  // NÃO exibe navbar na página de login
  const hideNavbar = location.pathname === "/" || !token;

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/ferramentas"
          element={
            <PrivateRoute>
              <Produtos />
            </PrivateRoute>
          }
        />

        <Route
          path="/estoque"
          element={
            <PrivateRoute>
              <Estoque />
            </PrivateRoute>
          }
        />

      <Route
          path="/produtos"
          element={
            <PrivateRoute>
              <Ferramentas />
            </PrivateRoute>
          }
        />

        
      <Route
          path="/editarprodutos/:id"
          element={
            <PrivateRoute>
              <EditarProduto />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
