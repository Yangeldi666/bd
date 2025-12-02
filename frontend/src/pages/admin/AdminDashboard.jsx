import React, { useState } from "react";
import { criarMedico } from "../../api/api";

export default function AdminDashboard({ token }) {
  const [medico, setMedico] = useState({ nome: "", especialidade: "" });
  const [msg, setMsg] = useState("");

  async function handleCriarMedico(e) {
    e.preventDefault();
    await criarMedico(medico, token);
    setMsg("Médico cadastrado com sucesso!");
    setMedico({ nome: "", especialidade: "" });
  }

  return (
    <div className="p-4">
      <h1>Painel do Administrador (Mock)</h1>
      {msg && <div className="bg-green-100 p-2">{msg}</div>}
      <form onSubmit={handleCriarMedico}>
        <input
          placeholder="Nome"
          value={medico.nome}
          onChange={(e) => setMedico({ ...medico, nome: e.target.value })}
        />
        <input
          placeholder="Especialidade"
          value={medico.especialidade}
          onChange={(e) => setMedico({ ...medico, especialidade: e.target.value })}
        />
        <button type="submit">Cadastrar Médico</button>
      </form>
    </div>
  );
}
