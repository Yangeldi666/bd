import React from "react";
import MarcarConsulta from "./MarcarConsulta";
import MinhasConsultas from "./MinhasConsultas";
import MinhasCirurgias from "./MinhasCirurgias";


export default function PacienteDashboard({ token }) {
return (
<div className="space-y-6">
<h1 className="text-2xl font-bold">Painel do Paciente</h1>
<MarcarConsulta token={token} />
<MinhasConsultas token={token} />
<MinhasCirurgias token={token} />
</div>
);
}