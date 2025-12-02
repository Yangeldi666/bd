import React, { useEffect, useState } from "react";
import { login, criarMedico, minhaAgenda } from "../api/api";

export default function ConsultasPorMedico({ token }) {
  const [consultas, setConsultas] = useState([]);
  const [erro, setErro] = useState("");

  async function carregarConsultas() {
    try {
      const c = await consultasPorMedico(token);
      setConsultas(c);
    } catch (e) {
      setErro("Erro ao carregar consultas por médico");
    }
  }

  useEffect(() => {
    carregarConsultas();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Consultas por Médico</h1>

      {erro && <div className="bg-red-100 text-red-800 p-2 rounded">{erro}</div>}

      {consultas.length > 0 ? (
        <table className="w-full border bg-white rounded shadow">
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
      ) : (
        <p>Nenhuma consulta registrada.</p>
      )}
    </div>
  );
}