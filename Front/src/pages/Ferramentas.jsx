import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [form, setForm] = useState({ nome: "", descricao: "", estoque_minimo: "" });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  async function carregar() {
    try {
      const res = await api.get("/ferramentas/", { params: { nome: busca } });
      setProdutos(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar produtos.");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function salvar() {
    if (!form.nome || !form.estoque_minimo) {
      return alert("Nome e estoque mínimo são obrigatórios!");
    }

    try {
      if (editId) {
        await api.put(`/ferramentas/${editId}/`, form);
      } else {
        await api.post("/ferramentas/", form);
      }

      setForm({ nome: "", descricao: "", estoque_minimo: "" });
      setEditId(null);
      carregar();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar produto.");
    }
  }

  async function remover(id) {
    if (!confirm("Confirma exclusão?")) return;

    try {
      await api.delete(`/ferramentas/${id}/`);
      carregar();
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir produto.");
    }
  }

  function editar(p) {
    setEditId(p.id);
    setForm({
      nome: p.nome,
      descricao: p.descricao,
      estoque_minimo: p.estoque_minimo
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Cadastro de Produtos</h2>

        <div className="row">
          <input
            placeholder="Buscar..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
          <button onClick={carregar}>Buscar</button>
          <button onClick={() => navigate("/home")}>Voltar</button>
        </div>

        <h3>{editId ? "Editar Produto" : "Novo Produto"}</h3>

        <div className="form-grid">
          <input
            placeholder="Nome"
            value={form.nome}
            onChange={e => setForm({ ...form, nome: e.target.value })}
          />

          <input
            placeholder="Descrição"
            value={form.descricao}
            onChange={e => setForm({ ...form, descricao: e.target.value })}
          />

          <input
            placeholder="Estoque mínimo"
            type="number"
            value={form.estoque_minimo}
            onChange={e => setForm({ ...form, estoque_minimo: e.target.value })}
          />
        </div>

        <div className="row">
          <button onClick={salvar}>Salvar</button>
        </div>
      </div>

      <div className="card">
        <h3>Lista de Produtos</h3>

        <table className="full">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Estoque Mínimo</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {produtos.map(p => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.descricao}</td>
                <td>{p.estoque_minimo}</td>
                <td>
                  <button onClick={() => editar(p)}>Editar</button>
                  <button onClick={() => remover(p.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
