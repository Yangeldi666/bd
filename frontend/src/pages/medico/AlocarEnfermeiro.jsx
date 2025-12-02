import React, { useEffect, useState } from "react";
import { login, criarMedico, minhaAgenda } from "../api/api";

export default function AlocarEnfermeiro({ token }) {
  const [enfermeiros, setEnfermeiros] = useState([]);
  const [alocacoes, setAlocacoes] = useState([]);
  const [enfermeiroId, setEnfermeiroId] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [msg, setMsg] = useState("");
  const [erro, setErro] = useState("");

  async function carregarDados() {
    try {
      const e = await listarEnfermeiros(token);
      setEnfermeiros(e);
      const a = await listarAlocacoes(token);
      setAlocacoes(a || []);
    } catch (e) {
      setErro("Erro ao carregar dados");
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function handleAlocar(e) {
    e.preventDefault();
    setErro("");
    setMsg("");

    if (!enfermeiroId || !dataInicio || !dataFim) {
      setErro("Preencha todos os campos");
      return;
    }

    try {
      await criarAlocacao({ enfermeiroId, dataInicio, dataFim }, token);
      setMsg("Enfermeiro alocado com sucesso!");
      setEnfermeiroId("");
      setDataInicio("");
      setDataFim("");
      carregarDados();
    } catch (e) {
      setErro(e.response?.data?.error || "Erro ao alocar enfermeiro");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Alocação de Enfermeiros</h1>

      {msg && <div className="bg-green-100 text-green-800 p-2 rounded">{msg}</div>}
      {erro && <div className="bg-red-100 text-red-800 p-2 rounded">{erro}</div>}

      <form onSubmit={handleAlocar} className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="font-semibold">Nova Alocação</h2>
        <select
          className="border p-2 w-full"
          value={enfermeiroId}
          onChange={(e) => setEnfermeiroId(e.target.value)}
        >
          <option value="">Selecione um enfermeiro</option>
          {enfermeiros.map((enf) => (
            <option key={enf.id} value={enf.id}>{enf.nome}</option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-2">
          <input type="date" className="border p-2" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
          <input type="date" className="border p-2" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Alocar</button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Alocações Atuais</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Enfermeiro</th>
              <th className="border p-2">Início</th>
              <th className="border p-2">Fim</th>
            </tr>
          </thead>
          <tbody>
            {alocacoes.map((a) => (
              <tr key={a.id}>
                <td className="border p-2">{a.enfermeiroNome}</td>
                <td className="border p-2">{a.dataInicio}</td>
                <td className="border p-2">{a.dataFim}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}