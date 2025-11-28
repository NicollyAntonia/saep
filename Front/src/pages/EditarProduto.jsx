import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

export default function EditarProduto() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  const editando = Boolean(id);

  const [form, setForm] = useState({
    nome: state?.nome || "",
    descricao: state?.descricao || "",
    quantidade: state?.quantidade || "",
    disponivel: state?.disponivel ?? true,
    estoque_minimo: state?.estoque_minimo || "",
  });

  async function salvar() {
    if (!form.nome || !form.quantidade || !form.estoque_minimo) {
      return alert("Nome, quantidade e estoque mínimo são obrigatórios!");
    }

    try {
      if (editando) {
        await api.put(`/ferramentas/${id}/`, form);
      } else {
        await api.post("/ferramentas/", form);
      }

      alert("Salvo com sucesso!");
      navigate("/produtos");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar.");
    }
  }

  return (
    <div className="min-h-screen bg-purple-900 text-white flex justify-center py-10 px-4">
      <div className="bg-purple-800 shadow-2xl p-10 rounded-xl w-full max-w-3xl">

        <h2 className="text-3xl font-bold mb-6 text-center">
          {editando ? "Editar Produto" : "Novo Produto"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
            type="number"
            placeholder="Quantidade"
            value={form.quantidade}
            onChange={(e) =>
              setForm({ ...form, quantidade: e.target.value })
            }
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
            type="number"
            placeholder="Estoque mínimo"
            value={form.estoque_minimo}
            onChange={(e) =>
              setForm({ ...form, estoque_minimo: e.target.value })
            }
            className="p-3 rounded-lg text-black"
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={salvar}
            className="flex-1 bg-purple-600 hover:bg-purple-500 transition py-3 rounded-lg text-lg"
          >
            Salvar
          </button>

          <button
            onClick={() => navigate("/produtos")}
            className="flex-1 bg-gray-600 hover:bg-gray-500 transition py-3 rounded-lg text-lg"
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
}
