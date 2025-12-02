import React, { useState } from "react";
import { login, criarMedico, minhaAgenda } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");

    try {
      const { token, role } = await login(username, password);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Redireciona de acordo com a role
      switch (role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "medico":
          navigate("/medico/dashboard");
          break;
        case "enfermeiro":
          navigate("/enfermeiro/dashboard");
          break;
        case "paciente":
          navigate("/paciente/dashboard");
          break;
        case "conselho":
          navigate("/conselho/dashboard");
          break;
        default:
          setErro("Usuário sem permissão");
      }
    } catch (e) {
      setErro("Usuário ou senha inválidos");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-96 space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>

        {erro && <div className="bg-red-100 text-red-800 p-2 rounded">{erro}</div>}

        <input
          className="border p-2 w-full"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Entrar</button>
      </form>
    </div>
  );
}