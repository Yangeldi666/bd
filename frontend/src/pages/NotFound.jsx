import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl">Página não encontrada</p>
      <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded">Voltar para o início</Link>
    </div>
  );
}