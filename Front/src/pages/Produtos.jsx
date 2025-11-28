import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    estoque_minimo: "",
  });
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
      estoque_minimo: p.estoque_minimo,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-purple-900 text-white py-10 px-4 flex flex-col items-center">

      {/* CARD DE CADASTRO */}
      <div className="bg-purple-800 p-8 rounded-xl shadow-2xl w-full max-w-4xl mb-10">

        <h2 className="text-3xl font-bold mb-6 text-center">Cadastro de Produtos</h2>

        {/* BARRA DE BUSCA */}
        <div className="flex gap-3 mb-6">
          <input
            placeholder="Buscar..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="flex-1 p-3 rounded-lg text-black outline-none"
          />

          <button
            onClick={carregar}
            className="bg-purple-600 hover:bg-purple-500 px-4 rounded-lg transition"
          >
            Buscar
          </button>

          <button
            onClick={() => navigate("/home")}
            className="bg-gray-600 hover:bg-gray-500 px-4 rounded-lg transition"
          >
            Voltar
          </button>
        </div>

        {/* FORMULÁRIO */}
        <h3 className="text-xl font-semibold mb-4">
          {editId ? "Editar Produto" : "Novo Produto"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <input
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className="p-3 rounded-lg text-black"
          />

          <input
            placeholder="Descrição"
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            className="p-3 rounded-lg text-black"
          />

          <input
            placeholder="Estoque mínimo"
            type="number"
            value={form.estoque_minimo}
            onChange={(e) =>
              setForm({ ...form, estoque_minimo: e.target.value })
            }
            className="p-3 rounded-lg text-black"
          />
        </div>

        <button
          onClick={salvar}
          className="w-full bg-purple-600 hover:bg-purple-500 py-3 rounded-lg text-lg transition"
        >
          Salvar
        </button>
      </div>

      {/* LISTA DE PRODUTOS */}
      <div className="bg-purple-800 p-8 rounded-xl shadow-2xl w-full max-w-5xl">

        <h3 className="text-2xl font-bold mb-6 text-center">Lista de Produtos</h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-700 text-white">
                <th className="p-3 text-left">Nome</th>
                <th className="p-3 text-left">Descrição</th>
                <th className="p-3 text-left">Estoque Mínimo</th>
                <th className="p-3 text-left">Ações</th>
              </tr>
            </thead>

            <tbody>
              {produtos.map((p) => (
                <tr key={p.id} className="border-b border-purple-600">
                  <td className="p-3">{p.nome}</td>
                  <td className="p-3">{p.descricao}</td>
                  <td className="p-3">{p.estoque_minimo}</td>
                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() => editar(p)}
                      className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-lg transition"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => remover(p.id)}
                      className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-lg transition"
                    >
                      Excluir
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}
