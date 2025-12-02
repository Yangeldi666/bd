import React, { useEffect, useState } from "react";
import { login, criarMedico, minhaAgenda } from "../api/api";

export default function AlocacaoConsultorio({ token }) {
  const [medicos, setMedicos] = useState([]);
  const [consultorios, setConsultorios] = useState([]);
  const [alocacoes, setAlocacoes] = useState([]);

  const [medicoId, setMedicoId] = useState("");
  const [consultorioId, setConsultorioId] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const [msg, setMsg] = useState("");
  const [erro, setErro] = useState("");

  async function carregarDados() {
    try {
      const m = await listarMedicos(token);
      const c = await listarConsultorios(token);

      setMedicos(m);
      setConsultorios(c);
    } catch (e) {
      setErro("Erro ao carregar médicos ou consultórios");
    }
  }

  async function carregarAlocacoes() {
    try {
      const a = await listarAlocacoes(token);
      setAlocacoes(a || []);
    } catch (e) {
      console.log("Sem alocações ainda");
    }
  }

  useEffect(() => {
    carregarDados();
    carregarAlocacoes();
  }, []);

  async function handleAlocar(e) {
    e.preventDefault();
    setErro("");
    setMsg("");

    if (!medicoId || !consultorioId || !dataInicio || !dataFim) {
      setErro("Preencha todos os campos");
      return;
    }

    try {
      await criarAlocacao(
        {
          medicoId,
          consultorioId,
          dataInicio,
          dataFim,
        },
        token
      );

      setMsg("Consultório alocado com sucesso!");
      setMedicoId("");
      setConsultorioId("");
      setDataInicio("");
      setDataFim("");

      carregarAlocacoes();
    } catch (e) {
      setErro(e.response?.data?.error || "Erro ao alocar consultório");
    }
  }

  async function handleDesalocar(id) {
    try {
      await removerAlocacao(id, token);
      carregarAlocacoes();
    } catch (e) {
      alert("Erro ao desalocar");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Alocação de Consultórios</h1>

      {msg && <div className="bg-green-100 text-green-800 p-2 rounded">{msg}</div>}
      {erro && <div className="bg-red-100 text-red-800 p-2 rounded">{erro}</div>}

      <form onSubmit={handleAlocar} className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="font-semibold">Nova Alocação Semanal</h2>

        <select
          className="border p-2 w-full"
          value={medicoId}
          onChange={(e) => setMedicoId(e.target.value)}
        >
          <option value="">Selecione um médico</option>
          {medicos.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nome} - {m.especialidade}
            </option>
          ))}
        </select>

        <select
          className="border p-2 w-full"
          value={consultorioId}
          onChange={(e) => setConsultorioId(e.target.value)}
        >
          <option value="">Selecione um consultório</option>
          {consultorios.map((c) => (
            <option key={c.id} value={c.id}>
              Consultório {c.numero}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            className="border p-2"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
          <input
            type="date"
            className="border p-2"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Alocar
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Alocações Atuais</h2>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Médico</th>
              <th className="border p-2">Consultório</th>
              <th className="border p-2">Início</th>
              <th className="border p-2">Fim</th>
              <th className="border p-2">Ação</th>
            </tr>
          </thead>
          <tbody>
            {alocacoes.map((a) => (
              <tr key={a.id}>
                <td className="border p-2">{a.medicoNome}</td>
                <td className="border p-2">{a.consultorioNumero}</td>
                <td className="border p-2">{a.dataInicio}</td>
                <td className="border p-2">{a.dataFim}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDesalocar(a.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Desalocar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
