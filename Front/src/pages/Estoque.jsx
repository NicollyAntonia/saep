import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [mov, setMov] = useState({
    ferramenta: "",
    tipo: "entrada",
    quantidade: "",
    descricao: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/ferramentas/")
      .then(res => setProdutos(res.data))
      .catch(err => {
        console.error(err);
        alert("Erro ao carregar produtos.");
      });
  }, []);

  async function movimentar() {
    if (!mov.ferramenta || !mov.tipo || !mov.quantidade || !mov.descricao.trim()) {
      return alert("Preencha todos os campos.");
    }

    try {
      await api.post("/movimentacoes/criar/", mov);
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

          <select
            value={mov.ferramenta}
            onChange={e => setMov({ ...mov, ferramenta: e.target.value })}
          >
            <option value="">Selecione o produto</option>
            {produtos
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map(p => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
          </select>

          <select
            value={mov.tipo}
            onChange={e => setMov({ ...mov, tipo: e.target.value })}
          >
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>

          <input
            type="number"
            placeholder="Quantidade"
            value={mov.quantidade}
            onChange={e => setMov({ ...mov, quantidade: e.target.value })}
          />

          <textarea
            placeholder="Descrição da movimentação"
            value={mov.descricao}
            onChange={e => setMov({ ...mov, descricao: e.target.value })}
          />
        </div>

        <div className="row">
          <button onClick={movimentar}>Registrar</button>
          <button onClick={() => navigate("/home")}>Voltar</button>
        </div>
      </div>
    </div>
  );
}
