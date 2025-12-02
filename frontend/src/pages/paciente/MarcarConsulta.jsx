import React, { useState, useEffect } from "react";
import { listarMedicos, marcarConsulta } from "../../api/api";


export default function MarcarConsulta({ token }) {
const [medicos, setMedicos] = useState([]);
const [medicoId, setMedicoId] = useState("");
const [data, setData] = useState("");
const [msg, setMsg] = useState("");
const [erro, setErro] = useState("");


useEffect(() => {
async function carregarMedicos() {
try {
const m = await listarMedicos(token);
setMedicos(m);
} catch {
setErro("Erro ao carregar médicos");
}
}
carregarMedicos();
}, [token]);


async function handleMarcar(e) {
e.preventDefault();
setMsg("");
setErro("");


if (!medicoId || !data) {
setErro("Selecione médico e data");
return;
}


try {
await marcarConsulta({ medicoId, data }, token);
setMsg("Consulta marcada com sucesso!");
setMedicoId("");
setData("");
} catch (e) {
setErro(e.response?.data?.error || "Erro ao marcar consulta");
}
}


return (
<div className="space-y-4">
<h2 className="font-semibold">Marcar Consulta</h2>
{msg && <div className="bg-green-100 text-green-800 p-2 rounded">{msg}</div>}
{erro && <div className="bg-red-100 text-red-800 p-2 rounded">{erro}</div>}
<form onSubmit={handleMarcar} className="bg-white p-4 rounded shadow space-y-2">
<select value={medicoId} onChange={e => setMedicoId(e.target.value)} className="border p-2 w-full">
<option value="">Selecione um médico</option>
{medicos.map(m => <option key={m.id} value={m.id}>{m.nome} - {m.especialidade}</option>)}
</select>
<input type="date" value={data} onChange={e => setData(e.target.value)} className="border p-2 w-full" />
<button className="bg-blue-600 text-white px-4 py-2 rounded">Marcar</button>
</form>
</div>
);
}