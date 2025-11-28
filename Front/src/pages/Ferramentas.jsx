import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    quantidade: "",
    disponivel: true,
    estoque_minimo: ""
  });

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
    if (!form.nome || !form.estoque_minimo || !form.quantidade) {
      return alert("Nome, Quantidade e Estoque Mínimo são obrigatórios!");
    }

    try {
      if (editId) {
        await api.put(`/ferramentas/${editId}/`, form);
      } else {
        await api.post("/ferramentas/", form);
      }

      setForm({
        nome: "",
        descricao: "",
        quantidade: "",
        disponivel: true,
        estoque_minimo: ""
      });

      setEditId(null);
      carregar();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar produto.");
    }
  }

  return (
    <div className="min-h-screen bg-purple-900 text-white py-10 px-4 flex justify-center">

      <div className="bg-purple-800 p-8 rounded-xl shadow-2xl w-full max-w-4xl">

        {/* Título */}
        <h2 className="text-3xl font-bold mb-6 text-center">Cadastro de Ferramentas</h2>

        {/* Busca */}
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
            className="bg-gray-700 hover:bg-gray-600 px-4 rounded-lg transition"
          >
            Voltar
          </button>
        </div>

        {/* Subtítulo */}
        <h3 className="text-xl font-semibold mb-4">
          {editId ? "Editar Ferramenta" : "Nova Ferramenta"}
        </h3>

        {/* Formulário */}
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
            placeholder="Quantidade"
            type="number"
            value={form.quantidade}
            onChange={(e) => setForm({ ...form, quantidade: e.target.value })}
            className="p-3 rounded-lg text-black"
          />

          <select
            value={form.disponivel}
            onChange={(e) =>
              setForm({ ...form, disponivel: e.target.value === "true" })
            }
            className="p-3 rounded-lg text-black"
          >
            <option value="true">Disponível</option>
            <option value="false">Indisponível</option>
          </select>

          <input
            placeholder="Estoque Mínimo"
            type="number"
            value={form.estoque_minimo}
            onChange={(e) =>
              setForm({ ...form, estoque_minimo: e.target.value })
            }
            className="p-3 rounded-lg text-black col-span-1"
          />
        </div>

        {/* Botão salvar */}
        <button
          onClick={salvar}
          className="w-full bg-purple-600 hover:bg-purple-500 py-3 rounded-lg text-lg transition"
        >
          Salvar
        </button>

      </div>
    </div>
  );
}
