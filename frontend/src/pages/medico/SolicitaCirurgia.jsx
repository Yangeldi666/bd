import React, { useState, useEffect } from "react";
import { login, criarMedico, minhaAgenda } from "../api/api";

export default function SolicitaCirurgia({ token }) {
  const [pacientes, setPacientes] = useState([]);
  const [salas, setSalas] = useState([]);
  const [pacienteId, setPacienteId] = useState("");
  const [salaId, setSalaId] = useState("");
  const [data, setData] = useState("");
  const [msg, setMsg] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        const p = await listarPacientes(token);
        const s = await listarSalasCirurgia(token);
        setPacientes(p);
        setSalas(s);
      } catch {
        setErro("Erro ao carregar pacientes ou salas");
      }
    }
    carregarDados();
  }, [token]);

  async function handleSolicitar(e) {
    e.preventDefault();
    setMsg("");
    setErro("");

    if (!pacienteId || !salaId || !data) {
      setErro("Preencha todos os campos");
      return;
    }

    try {
      await solicitarCirurgia({ pacienteId, salaId, data }, token);
      setMsg("Cirurgia solicitada com sucesso!");
      setPacienteId("");
      setSalaId("");
      setData("");
    } catch (e) {
      setErro(e.response?.data?.error || "Erro ao solicitar cirurgia");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Solicitar Cirurgia</h1>
      {msg && <div className="bg-green-100 text-green-800 p-2 rounded">{msg}</div>}
      {erro && <div className="bg-red-100 text-red-800 p-2 rounded">{erro}</div>}
      <form onSubmit={handleSolicitar} className="bg-white p-4 rounded shadow space-y-3">
        <select className="border p-2 w-full" value={pacienteId} onChange={(e) => setPacienteId(e.target.value)}>
          <option value="">Selecione um paciente</option>
          {pacientes.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>
        <select className="border p-2 w-full" value={salaId} onChange={(e) => setSalaId(e.target.value)}>
          <option value="">Selecione uma sala</option>
          {salas.map((s) => <option key={s.id} value={s.id}>{s.numero}</option>)}
        </select>
        <input type="date" className="border p-2 w-full" value={data} onChange={(e) => setData(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Solicitar Cirurgia</button>
      </form>
    </div>
  );
}