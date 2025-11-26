import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const nome = localStorage.getItem("usuario") || "Usuário";

  function logout() {
    localStorage.clear();
    navigate("/home");   // corrigido!
  }

  return (
    <div className="container">
      <header className="card">
        <h2>Bem-vindo, {nome}</h2>
        <div className="actions">
          <button onClick={() => navigate("/ferramentas")}>
            Cadastro de Produtos
          </button>

          <button onClick={() => navigate("/estoque")}>
            Gestão de Estoque
          </button>

          <button className="danger" onClick={logout}>
            Sair
          </button>
        </div>
      </header>
    </div>
  );
}
