import React, { useState } from "react";
import { login, criarMedico, minhaAgenda } from "../api/api";

export default function CadastroLeitos({ token }) {
  const [leito, setLeito] = useState({ numero: "", tipo: "" });
  const [msg, setMsg] = useState("");
  const [erro, setErro] = useState("");

  async function handleCriar(e) {
    e.preventDefault();
    setErro("");
    setMsg("");

    if (!leito.numero || !leito.tipo) {
      setErro("Preencha todos os campos do leito");
      return;
    }

    try {
      await criarLeito(leito, token);
      setMsg(`Leito ${leito.numero} do tipo ${leito.tipo} cadastrado com sucesso!`);
      setLeito({ numero: "", tipo: "" });
    } catch (e) {
      setErro(e.response?.data?.error || "Erro ao cadastrar leito");
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Cadastrar Leito</h1>

      {msg && <div className="bg-green-100 text-green-800 p-2 rounded">{msg}</div>}
      {erro && <div className="bg-red-100 text-red-800 p-2 rounded">{erro}</div>}

      <form onSubmit={handleCriar} className="bg-white p-4 rounded shadow space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Número do Leito"
          value={leito.numero}
          onChange={(e) => setLeito({ ...leito, numero: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Tipo do Leito (UTI, Quarto, etc)"
          value={leito.tipo}
          onChange={(e) => setLeito({ ...leito, tipo: e.target.value })}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Cadastrar</button>
      </form>
    </div>
  );
}