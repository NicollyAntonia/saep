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
          password: senha
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );

      console.log("Login OK:", response.data);

      // 🔥 SALVA "token fake" para habilitar o PrivateRoute
      localStorage.setItem("token", "logado");

      // 🔥 REDIRECIONA
      navigate("/home");

    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button onClick={logar}>Entrar</button>
    </div>
  );
}
