import React, { useEffect, useState } from "react";
import { login, criarMedico, minhaAgenda } from "../api/api";

export default function ConselhoDashboard({ token }) {
  const [ocupacao, setOcupacao] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [erro, setErro] = useState("");

  async function carregarDados() {
    try {
      const t = await taxaOcupacao(token);
      const c = await consultasPorMedico(token);
      setOcupacao(t);
      setConsultas(c);
    } catch (e) {
      setErro("Erro ao carregar dados do conselho");
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard do Conselho</h1>

      {erro && <div className="bg-red-100 text-red-800 p-2 rounded">{erro}</div>}

      {ocupacao && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Taxa de Ocupação</h2>
          <p>{ocupacao}%</p>
        </div>
      )}

      {consultas.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Consultas por Médico</h2>
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Médico</th>
                <th className="border p-2">Total de Consultas</th>
              </tr>
            </thead>
            <tbody>
              {consultas.map((c) => (
                <tr key={c.medicoId}>
                  <td className="border p-2">{c.medicoNome}</td>
                  <td className="border p-2">{c.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}