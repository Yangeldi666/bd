import React, { useState } from "react";
import { login, criarMedico, minhaAgenda } from "../api/api";

export default function CadastroEnfermeiros({ token }) {
  const [enfermeiro, setEnfermeiro] = useState({ nome: "" });
  const [msg, setMsg] = useState("");
  const [erro, setErro] = useState("");

  async function handleCriar(e) {
    e.preventDefault();
    setErro("");
    setMsg("");

    if (!enfermeiro.nome) {
      setErro("Preencha o nome do enfermeiro");
      return;
    }

    try {
      await criarEnfermeiro(enfermeiro, token);
      setMsg(`Enfermeiro ${enfermeiro.nome} cadastrado com sucesso!`);
      setEnfermeiro({ nome: "" });
    } catch (e) {
      setErro(e.response?.data?.error || "Erro ao cadastrar enfermeiro");
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Cadastrar Enfermeiro</h1>

      {msg && <div className="bg-green-100 text-green-800 p-2 rounded">{msg}</div>}
      {erro && <div className="bg-red-100 text-red-800 p-2 rounded">{erro}</div>}

      <form onSubmit={handleCriar} className="bg-white p-4 rounded shadow space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Nome do Enfermeiro"
          value={enfermeiro.nome}
          onChange={(e) => setEnfermeiro({ nome: e.target.value })}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Cadastrar</button>
      </form>
    </div>
  );
}
