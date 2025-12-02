import { Link } from "react-router-dom";

export default function Navbar({ role, onLogout }) {
  const baseLinkClass = "px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100";

  const renderLinksByRole = () => {
    switch (role) {
      case "admin":
        return (
          <>
            <Link className={baseLinkClass} to="/admin">Dashboard</Link>
            <Link className={baseLinkClass} to="/admin/medicos">Médicos</Link>
            <Link className={baseLinkClass} to="/admin/enfermeiros">Enfermeiros</Link>
            <Link className={baseLinkClass} to="/admin/leitos">Leitos</Link>
            <Link className={baseLinkClass} to="/admin/consultorios">Consultórios</Link>
            <Link className={baseLinkClass} to="/admin/alocacoes">Alocação</Link>
          </>
        );
      case "medico":
        return (
          <>
            <Link className={baseLinkClass} to="/medico">Dashboard</Link>
            <Link className={baseLinkClass} to="/medico/agenda">Minha Agenda</Link>
            <Link className={baseLinkClass} to="/medico/cirurgia">Solicitar Cirurgia</Link>
          </>
        );
      case "enfermeiro":
        return (
          <>
            <Link className={baseLinkClass} to="/enfermeiro">Dashboard</Link>
            <Link className={baseLinkClass} to="/enfermeiro/alocacoes">Minhas Alocações</Link>
            <Link className={baseLinkClass} to="/enfermeiro/historico">Histórico de Plantões</Link>
          </>
        );
      case "paciente":
        return (
          <>
            <Link className={baseLinkClass} to="/paciente">Dashboard</Link>
            <Link className={baseLinkClass} to="/paciente/marcar">Marcar Consulta</Link>
            <Link className={baseLinkClass} to="/paciente/consultas">Minhas Consultas</Link>
            <Link className={baseLinkClass} to="/paciente/cirurgias">Minhas Cirurgias</Link>
          </>
        );
      case "conselho":
        return (
          <>
            <Link className={baseLinkClass} to="/conselho">Dashboard</Link>
            <Link className={baseLinkClass} to="/conselho/taxa-ocupacao">Taxa de Ocupação</Link>
            <Link className={baseLinkClass} to="/conselho/consultas">Consultas por Médico</Link>
            <Link className={baseLinkClass} to="/conselho/especialidades">Especialidades</Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="font-bold text-lg">Sistema Hospitalar</span>
        <div className="hidden md:flex gap-2">{renderLinksByRole()}</div>
      </div>

      <button
        onClick={onLogout}
        className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
      >
        Sair
      </button>
    </nav>
  );
}