import React from "react";
import AgendaMedico from "./AgendaMedico";
import AlocarEnfermeiro from "./AlocarEnfermeiro";
import AlocarLeito from "./AlocarLeito";

export default function MedicoDashboard({ token }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Painel do Médico</h1>
      <AgendaMedico token={token} />
      <AlocarEnfermeiro token={token} />
      <AlocarLeito token={token} />
    </div>
  );
}
