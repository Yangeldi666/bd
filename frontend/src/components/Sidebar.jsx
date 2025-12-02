import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ role }) {
  const [open, setOpen] = useState(true);

  const baseLink =
    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition";
  const activeLink = "bg-blue-600 text-white";
  const inactiveLink = "text-gray-700 hover:bg-gray-100";

  const renderLinksByRole = () => {
    switch (role) {
      case "admin":
        return (
          <>
            <NavLink to="/admin" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Dashboard</NavLink>
            <NavLink to="/admin/medicos" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Médicos</NavLink>
            <NavLink to="/admin/enfermeiros" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Enfermeiros</NavLink>
            <NavLink to="/admin/leitos" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Leitos</NavLink>
            <NavLink to="/admin/consultorios" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Consultórios</NavLink>
            <NavLink to="/admin/alocacoes" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Alocação</NavLink>
          </>
        );

      case "medico":
        return (
          <>
            <NavLink to="/medico" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Dashboard</NavLink>
            <NavLink to="/medico/agenda" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Minha Agenda</NavLink>
            <NavLink to="/medico/cirurgia" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Solicitar Cirurgia</NavLink>
            <NavLink to="/medico/enfermeiros" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Alocar Enfermeiros</NavLink>
          </>
        );

      case "enfermeiro":
        return (
          <>
            <NavLink to="/enfermeiro" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Dashboard</NavLink>
            <NavLink to="/enfermeiro/alocacoes" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Minhas Alocações</NavLink>
            <NavLink to="/enfermeiro/historico" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Histórico de Plantões</NavLink>
          </>
        );

      case "paciente":
        return (
          <>
            <NavLink to="/paciente" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Dashboard</NavLink>
            <NavLink to="/paciente/marcar" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Marcar Consulta</NavLink>
            <NavLink to="/paciente/consultas" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Minhas Consultas</NavLink>
            <NavLink to="/paciente/cirurgias" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Minhas Cirurgias</NavLink>
          </>
        );

      case "conselho":
        return (
          <>
            <NavLink to="/conselho" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Dashboard</NavLink>
            <NavLink to="/conselho/taxa-ocupacao" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Taxa de Ocupação</NavLink>
            <NavLink to="/conselho/consultas" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Consultas por Médico</NavLink>
            <NavLink to="/conselho/especialidades" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>Especialidades</NavLink>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <aside className={`h-screen bg-white border-r shadow-sm transition-all ${open ? "w-64" : "w-16"}`}>
      <div className="flex items-center justify-between p-4 border-b">
        <span className={`font-bold text-lg ${!open && "hidden"}`}>Hospital</span>
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-600 hover:text-gray-900 text-sm"
        >
          {open ? "⟨" : "⟩"}
        </button>
      </div>

      <nav className="flex flex-col gap-1 mt-4 px-2">{renderLinksByRole()}</nav>
    </aside>
  );
}