import React, { useEffect, useState } from "react";
import { login, criarMedico, minhaAgenda } from "../api/api";

export default function HistoricoPlantoes({ token }) {
  const [plantoes, setPlantoes] = useState([]);
  const [erro, setErro] = useState("");

  async function carregarHistorico() {
    try {
      const historico = await minhasAlocacoes(token); // assumindo que retorna todo histórico
      setPlantoes(historico);
    } catch (e) {
      setErro("Erro ao carregar histórico de plantões");
    }
  }

  useEffect(() => {
    carregarHistorico();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Histórico de Plantões</h1>

      {erro && <div className="bg-red-100 text-red-800 p-2 rounded">{erro}</div>}

      {plantoes.length > 0 ? (
        <table className="w-full border bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Local</th>
              <th className="border p-2">Início</th>
              <th className="border p-2">Fim</th>
            </tr>
          </thead>
          <tbody>
            {plantoes.map((p) => (
              <tr key={p.id}>
                <td className="border p-2">{p.local}</td>
                <td className="border p-2">{p.dataInicio}</td>
                <td className="border p-2">{p.dataFim}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum plantão registrado.</p>
      )}
    </div>
  );
}