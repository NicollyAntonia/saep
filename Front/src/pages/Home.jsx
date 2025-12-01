import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const nome = localStorage.getItem("usuario") || "Usuário";

  function logout() {
    localStorage.clear();
    navigate("/home");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-900">
      <div className="bg-purple-800 text-white p-10 rounded-xl shadow-2xl w-96 text-center">
        
        <h2 className="text-3xl font-bold mb-6">
          Bem-vindo, {nome}!
        </h2>

        <div className="flex flex-col gap-4">

          <button
            onClick={() => navigate("/ferramentas")}
            className="bg-purple-600 hover:bg-purple-500 transition text-white py-3 rounded-lg"
          >
            Cadastro de Produtos
          </button>

          <button
            onClick={() => navigate("/estoque")}
            className="bg-purple-600 hover:bg-purple-500 transition text-white py-3 rounded-lg"
          >
            Gestão de Estoque
          </button>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-500 transition text-white py-3 rounded-lg"
          >
            Sair
          </button>
          
        </div>

      </div>
    </div>
  );
}
