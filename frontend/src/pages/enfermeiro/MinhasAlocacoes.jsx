import React, { useEffect, useState } from "react";
import { login, criarMedico, minhaAgenda } from "../api/api";

export default function MinhasAlocacoes({ token }) {
  const [alocacoes, setAlocacoes] = useState([]);
  const [erro, setErro] = useState("");

  async function carregarAlocacoes() {
    try {
      const a = await minhasAlocacoes(token);
      setAlocacoes(a);
    } catch (e) {
      setErro("Erro ao carregar suas alocações");
    }
  }

  useEffect(() => {
    carregarAlocacoes();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Minhas Alocações</h1>

      {erro && <div className="bg-red-100 text-red-800 p-2 rounded">{erro}</div>}

      {alocacoes.length > 0 ? (
        <table className="w-full border bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Local</th>
              <th className="border p-2">Início</th>
              <th className="border p-2">Fim</th>
            </tr>
          </thead>
          <tbody>
            {alocacoes.map((a) => (
              <tr key={a.id}>
                <td className="border p-2">{a.local}</td>
                <td className="border p-2">{a.dataInicio}</td>
                <td className="border p-2">{a.dataFim}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhuma alocação registrada.</p>
      )}
    </div>
  );
}