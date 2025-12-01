
import React from "react";
import { Link } from "react-router-dom";
import "./stylesnavBar.css";
export default function Navbar() {
  const nome = localStorage.getItem("usuario") || "Usuário";

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="brand">SAEP</div>

        <div className="links">
          <Link to="/home">Home</Link>
          <Link to="/produtos">Produtos</Link>
          <Link to="/estoque">Movimentação</Link>
        </div>
      </div>
    </nav>
  );
}
