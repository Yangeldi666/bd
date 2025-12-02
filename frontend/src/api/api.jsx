// src/api/api.jsx
// Todas as funções simulam chamadas async com dados de exemplo

// AUTENTICAÇÃO
export const login = (username, password) =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ token: "mock-token", user: { username, role: "admin" } }), 500)
  );

// ADMIN
export const criarMedico = (dados, token) =>
  new Promise((resolve) => setTimeout(() => resolve({ ...dados, id: Date.now() }), 500));

export const criarEnfermeiro = (dados, token) =>
  new Promise((resolve) => setTimeout(() => resolve({ ...dados, id: Date.now() }), 500));

export const criarLeito = (dados, token) =>
  new Promise((resolve) => setTimeout(() => resolve({ ...dados, id: Date.now() }), 500));

export const criarConsultorio = (dados, token) =>
  new Promise((resolve) => setTimeout(() => resolve({ ...dados, id: Date.now() }), 500));

// PACIENTE
export const marcarConsulta = (dados, token) =>
  new Promise((resolve) => setTimeout(() => resolve({ ...dados, id: Date.now() }), 500));

export const listarMinhasConsultas = (token) =>
  new Promise((resolve) =>
    setTimeout(() => resolve([{ id: 1, medicoNome: "Dr. João", data: "2025-12-01" }]), 500)
  );

// MÉDICO
export const minhaAgenda = (token) =>
  new Promise((resolve) =>
    setTimeout(() => resolve([{ id: 1, pacienteNome: "Maria", horario: "10:00" }]), 500)
  );

export const solicitarCirurgia = (dados, token) =>
  new Promise((resolve) => setTimeout(() => resolve({ ...dados, id: Date.now() }), 500));

// ENFERMEIRO
export const minhasAlocacoes = (token) =>
  new Promise((resolve) =>
    setTimeout(() => resolve([{ id: 1, enfermeiroNome: "Ana", local: "UTI 1", turno: "08:00-20:00" }]), 500)
  );

// CONSELHO
export const taxaOcupacao = (token) =>
  new Promise((resolve) => setTimeout(() => resolve({ uti: 80, consultorios: 60 }), 500));

export const consultasPorMedico = (token) =>
  new Promise((resolve) =>
    setTimeout(() => resolve([{ medicoNome: "Dr. João", totalConsultas: 10 }]), 500)
  );
