const db = require('../config/database');

exports.verAgenda = async (req, res) => {
  const medico_id = req.user.id;

  const r = await db.query(
    `SELECT * FROM consultas WHERE medico_id=$1 AND status='agendada'`,
    [medico_id]
  );

  res.json(r.rows);
};

exports.solicitarCirurgia = async (req, res) => {
  const { paciente_id, sala_id, leito_id, inicio, fim } = req.body;
  const medico_id = req.user.id;

  const r = await db.query(
    `INSERT INTO cirurgias (paciente_id, medico_id, sala_id, leito_recuperacao_id, start_at, end_at)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [paciente_id, medico_id, sala_id, leito_id, inicio, fim]
  );

  res.json(r.rows[0]);
};

exports.alocarLeito = async (req, res) => {
  const { leito_id, paciente_id, inicio, fim } = req.body;

  const r = await db.query(
    `INSERT INTO leito_ocupacao (leito_id,paciente_id,start_at,end_at)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [leito_id, paciente_id, inicio, fim]
  );

  res.json(r.rows[0]);
};

exports.alocarEnfermeiro = async (req, res) => {
  const { cirurgia_id, nurse_id } = req.body;

  const r = await db.query(
    `INSERT INTO cirurgia_enfermeiro (cirurgia_id,nurse_id)
     VALUES ($1,$2) RETURNING *`,
    [cirurgia_id, nurse_id]
  );

  res.json(r.rows[0]);
};
