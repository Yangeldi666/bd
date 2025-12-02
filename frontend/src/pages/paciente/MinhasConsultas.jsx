import React, { useEffect, useState } from "react";
import { listarMinhasConsultas } from "../../api/api";


export default function MinhasConsultas({ token }) {
const [consultas, setConsultas] = useState([]);


useEffect(() => {
async function carregarConsultas() {
const c = await listarMinhasConsultas(token);
setConsultas(c);
}
carregarConsultas();
}, [token]);


return (
<div className="bg-white p-4 rounded shadow space-y-2">
<h2 className="font-semibold">Minhas Consultas</h2>
<table className="w-full border">
<thead className="bg-gray-100">
<tr>
<th className="border p-2">Médico</th>
<th className="border p-2">Data</th>
<th className="border p-2">Consultório</th>
</tr>
</thead>
<tbody>
{consultas.map(c => (
<tr key={c.id}>
<td className="border p-2">{c.medicoNome}</td>
<td className="border p-2">{c.data}</td>
<td className="border p-2">{c.consultorioNumero}</td>
</tr>
))}
</tbody>
</table>
</div>
);
}