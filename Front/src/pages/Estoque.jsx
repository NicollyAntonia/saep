import React from "react";

import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [mov, setMov] = useState({
    produtoId: "",
    tipo: "entrada",
    quantidade: "",
    data: ""
  });
  
  const navigate = useNavigate();
  useEffect(() => {
    api.get("/movimentacoes").then(res => setProdutos(res.data)).catch(err => {
      console.error(err);
      alert("Erro ao carregar produtos.");
    });
  }, []);

  async function movimentar() {
    if (!mov.produtoId || !mov.quantidade || !mov.data) {
      return alert("Preencha todos os campos da movimentação.");
    }
    try {
      const res = await api.post("/movitacoes/criar", mov);
      if (res.data && res.data.alerta) {
        alert("⚠ Estoque abaixo do mínimo!");
      }
      alert("Movimentação registrada!");
    } catch (err) {
      console.error(err);
      alert("Erro ao registrar movimentação.");
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Gestão de Estoque</h2>

        <div className="form-grid">
          <select value={mov.produtoId}
            onChange={e => setMov({ ...mov, produtoId: e.target.value })}>
            <option value="">Selecione o produto</option>
            {produtos.sort((a,b)=>a.nome.localeCompare(b.nome)).map(p=>(
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>

          <select value={mov.tipo}
            onChange={e => setMov({ ...mov, tipo: e.target.value })}>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>

          <input type="number" placeholder="Quantidade" value={mov.quantidade}
            onChange={e => setMov({ ...mov, quantidade: e.target.value })} />

          <input type="date" value={mov.data}
            onChange={e => setMov({ ...mov, data: e.target.value })} />
        </div>

        <div className="row">
          <button onClick={movimentar}>Registrar</button>
          <button onClick={() => navigate("/home")}>Voltar</button>
        </div>
      </div>
    </div>
  );
}
