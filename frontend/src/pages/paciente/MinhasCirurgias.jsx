import React, { useEffect, useState } from "react";
import { listarMinhasCirurgias } from "../../api/api";


export default function MinhasCirurgias({ token }) {
const [cirurgias, setCirurgias] = useState([]);


useEffect(() => {
async function carregarCirurgias() {
const c = await listarMinhasCirurgias(token);
setCirurgias(c);
}
carregarCirurgias();
}, [token]);


return (
<div className="bg-white p-4 rounded shadow space-y-2">
<h2 className="font-semibold">Minhas Cirurgias</h2>
<table className="w-full border">
<thead className="bg-gray-100">
<tr>
<th className="border p-2">Data</th>
<th className="border p-2">Sala</th>
<th className="border p-2">Médico</th>
</tr>
</thead>
<tbody>
{cirurgias.map(c => (
<tr key={c.id}>
<td className="border p-2">{c.data}</td>
<td className="border p-2">{c.salaNumero}</td>
<td className="border p-2">{c.medicoNome}</td>
</tr>
))}
</tbody>
</table>
</div>
);
}