import React, { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const logar = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        {
          username: usuario,
          password: senha,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Login OK:", response.data);

      localStorage.setItem("token", "logado");
      localStorage.setItem("usuario", usuario);

      navigate("/home");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-900">
      <div className="bg-purple-800 p-10 rounded-xl shadow-xl w-96 text-center text-white">

        <h2 className="text-3xl font-bold mb-6">Login</h2>

        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg text-black focus:outline-none"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg text-black focus:outline-none"
        />

        <button
          onClick={logar}
          className="w-full bg-purple-600 hover:bg-purple-500 transition text-white py-3 rounded-lg"
        >
          Entrar
        </button>

      </div>
    </div>
  );
}
