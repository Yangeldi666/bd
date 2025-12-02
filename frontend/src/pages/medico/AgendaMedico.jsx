import React, { useEffect, useState } from "react";
import { login, criarMedico, minhaAgenda } from "../api/api";

export default function AgendaMedico({ token }) {
  const [agenda, setAgenda] = useState([]);
  const [erro, setErro] = useState("");
  const [msg, setMsg] = useState("");
  const [cirurgia, setCirurgia] = useState({ pacienteId: "", sala: "", data: "" });

  async function carregarAgenda() {
    try {
      const a = await minhaAgenda(token);
      setAgenda(a);
    } catch (e) {
      setErro("Erro ao carregar agenda");
    }
  }

  useEffect(() => {
    carregarAgenda();
  }, []);

  async function handleSolicitarCirurgia(e) {
    e.preventDefault();
    setErro("");
    setMsg("");

    if (!cirurgia.pacienteId || !cirurgia.sala || !cirurgia.data) {
      setErro("Preencha todos os campos para solicitar cirurgia");
      return;
    }

    try {
      await solicitarCirurgia(cirurgia, token);
      setMsg("Cirurgia solicitada com sucesso!");
      setCirurgia({ pacienteId: "", sala: "", data: "" });
      carregarAgenda();
    } catch (e) {
      setErro(e.response?.data?.error || "Erro ao solicitar cirurgia");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Agenda do Médico</h1>

      {msg && <div className="bg-green-100 text-green-800 p-2 rounded">{msg}</div>}
      {erro && <div className="bg-red-100 text-red-800 p-2 rounded">{erro}</div>}

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Próximas Consultas</h2>
        {agenda.length > 0 ? (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Paciente</th>
                <th className="border p-2">Data</th>
                <th className="border p-2">Consultório</th>
              </tr>
            </thead>
            <tbody>
              {agenda.map((a) => (
                <tr key={a.id}>
                  <td className="border p-2">{a.pacienteNome}</td>
                  <td className="border p-2">{a.data}</td>
                  <td className="border p-2">{a.consultorioNumero}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhuma consulta agendada.</p>
        )}
      </div>

      <form onSubmit={handleSolicitarCirurgia} className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="font-semibold">Solicitar Cirurgia</h2>
        <input
          className="border p-2 w-full"
          placeholder="ID do Paciente"
          value={cirurgia.pacienteId}
          onChange={(e) => setCirurgia({ ...cirurgia, pacienteId: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Sala de Cirurgia"
          value={cirurgia.sala}
          onChange={(e) => setCirurgia({ ...cirurgia, sala: e.target.value })}
          required
        />
        <input
          type="date"
          className="border p-2 w-full"
          value={cirurgia.data}
          onChange={(e) => setCirurgia({ ...cirurgia, data: e.target.value })}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Solicitar Cirurgia</button>
      </form>
    </div>
  );
}