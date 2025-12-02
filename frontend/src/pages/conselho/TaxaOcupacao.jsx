import React, { useEffect, useState } from "react";
import { login, criarMedico, minhaAgenda } from "../api/api";

export default function Especialidades({ token }) {
  const [especialidades, setEspecialidades] = useState([]);
  const [erro, setErro] = useState("");

  async function carregarEspecialidades() {
    try {
      const e = await listarEspecialidades(token);
      setEspecialidades(e);
    } catch (err) {
      setErro("Erro ao carregar especialidades");
    }
  }

  useEffect(() => {
    carregarEspecialidades();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Especialidades Médicas</h1>

      {erro && <div className="bg-red-100 text-red-800 p-2 rounded">{erro}</div>}

      {especialidades.length > 0 ? (
        <ul className="bg-white p-4 rounded shadow space-y-2">
          {especialidades.map((esp) => (
            <li key={esp.id} className="border p-2 rounded">
              {esp.nome}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma especialidade registrada.</p>
      )}
    </div>
  );
}