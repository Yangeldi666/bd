import React, { useState } from "react";
import { login, criarMedico, minhaAgenda } from "../api/api";

export default function CadastroMedicos({ token }) {
  const [medico, setMedico] = useState({ nome: "", especialidade: "" });
  const [msg, setMsg] = useState("");
  const [erro, setErro] = useState("");

  async function handleCriar(e) {
    e.preventDefault();
    setErro("");
    setMsg("");

    if (!medico.nome || !medico.especialidade) {
      setErro("Preencha todos os campos do médico");
      return;
    }

    try {
      await criarMedico(medico, token);
      setMsg(`Médico ${medico.nome} (${medico.especialidade}) cadastrado com sucesso!`);
      setMedico({ nome: "", especialidade: "" });
    } catch (e) {
      setErro(e.response?.data?.error || "Erro ao cadastrar médico");
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Cadastrar Médico</h1>

      {msg && <div className="bg-green-100 text-green-800 p-2 rounded">{msg}</div>}
      {erro && <div className="bg-red-100 text-red-800 p-2 rounded">{erro}</div>}

      <form onSubmit={handleCriar} className="bg-white p-4 rounded shadow space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Nome do Médico"
          value={medico.nome}
          onChange={(e) => setMedico({ ...medico, nome: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Especialidade"
          value={medico.especialidade}
          onChange={(e) => setMedico({ ...medico, especialidade: e.target.value })}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Cadastrar</button>
      </form>
    </div>
  );
}