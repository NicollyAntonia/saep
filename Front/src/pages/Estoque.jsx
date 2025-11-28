import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Estoque() {
  const [movs, setMovs] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [mov, setMov] = useState({
    ferramenta_id: "",
    tipo: "entrada",
    quantidade: "",
    descricao: "",
  });

  const navigate = useNavigate();

  // Carregar movimentações
  useEffect(() => {
    api
      .get("/movimentacoes/")
      .then((res) => setMovs(res.data))
      .catch(() => alert("Erro ao carregar movimentações."));
  }, []);

  // Carregar produtos
  useEffect(() => {
    api
      .get("/ferramentas/")
      .then((res) => setProdutos(res.data))
      .catch(() => alert("Erro ao carregar produtos."));
  }, []);

  async function movimentar() {
    if (!mov.ferramenta_id || !mov.tipo || !mov.quantidade || !mov.descricao.trim()) {
      return alert("Preencha todos os campos.");
    }

    try {
      await api.post("/movimentacoes/criar/", {
        ferramenta_id: Number(mov.ferramenta_id),
        tipo: mov.tipo,
        quantidade: Number(mov.quantidade),
        descricao: mov.descricao.trim(),
      });

      alert("Movimentação registrada!");

      setMov({
        ferramenta_id: "",
        tipo: "entrada",
        quantidade: "",
        descricao: "",
      });
    } catch (err) {
      console.error(err);
      alert("Erro ao registrar movimentação.");
    }
  }

  return (
    <div className="min-h-screen bg-purple-900 text-white py-10 px-4 flex flex-col items-center">

      {/* CARD DE MOVIMENTAÇÃO */}
      <div className="bg-purple-800 p-8 rounded-xl shadow-2xl w-full max-w-4xl mb-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Gestão de Estoque</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <select
            value={mov.ferramenta_id}
            onChange={(e) =>
              setMov({ ...mov, ferramenta_id: Number(e.target.value) })
            }
            className="p-3 rounded-lg text-black"
          >
            <option value="">Selecione o produto</option>
            {produtos
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
          </select>

          <select
            value={mov.tipo}
            onChange={(e) => setMov({ ...mov, tipo: e.target.value })}
            className="p-3 rounded-lg text-black"
          >
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>

          <input
            type="number"
            placeholder="Quantidade"
            value={mov.quantidade}
            onChange={(e) => setMov({ ...mov, quantidade: Number(e.target.value) })}
            className="p-3 rounded-lg text-black"
          />

          <textarea
            placeholder="Descrição da movimentação"
            value={mov.descricao}
            onChange={(e) => setMov({ ...mov, descricao: e.target.value })}
            className="p-3 rounded-lg text-black"
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={movimentar}
            className="flex-1 bg-purple-600 hover:bg-purple-500 transition py-3 rounded-lg text-lg"
          >
            Registrar
          </button>

          <button
            onClick={() => navigate("/home")}
            className="flex-1 bg-gray-600 hover:bg-gray-500 transition py-3 rounded-lg text-lg"
          >
            Voltar
          </button>
        </div>
      </div>

      {/* HISTÓRICO */}
      <div className="bg-purple-800 p-8 rounded-xl shadow-2xl w-full max-w-6xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Histórico de Movimentações</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-purple-700">
                <th className="p-3">ID</th>
                <th className="p-3">Ferramenta</th>
                <th className="p-3">Tipo</th>
                <th className="p-3">Quantidade</th>
                <th className="p-3">Descrição</th>
                <th className="p-3">Usuário</th>
                <th className="p-3">Alteração</th>
              </tr>
            </thead>

            <tbody>
              {movs.length > 0 ? (
                movs.map((m) => (
                  <tr key={m.id} className="border-b border-purple-600">
                    <td className="p-3">{m.id}</td>
                    <td className="p-3">{m.ferramenta_id}</td>
                    <td
                      className={`p-3 font-bold ${
                        m.tipo === "entrada" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {m.tipo.toUpperCase()}
                    </td>
                    <td className="p-3">{m.quantidade}</td>
                    <td className="p-3">{m.descricao}</td>
                    <td className="p-3">{m.usuario_id}</td>
                    <td className="p-3">
                      {new Date(m.alteracao).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-300">
                    Nenhuma movimentação registrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button
          onClick={() => navigate("/home")}
          className="w-full mt-6 bg-gray-600 hover:bg-gray-500 py-3 rounded-lg text-lg transition"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
