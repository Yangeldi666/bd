const db = require('../config/database');

exports.marcarConsulta = async (req, res) => {
  const { medico_id, consultorio_id, inicio, fim } = req.body;
  const paciente_id = req.user.id;

  const r = await db.query(
    `INSERT INTO consultas (paciente_id, medico_id, consultorio_id, start_at, end_at)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [paciente_id, medico_id, consultorio_id, inicio, fim]
  );

  res.json(r.rows[0]);
};

exports.minhasConsultas = async (req, res) => {
  const paciente_id = req.user.id;
  const r = await db.query(`SELECT * FROM consultas WHERE paciente_id=$1`, [paciente_id]);
  res.json(r.rows);
};

exports.minhasCirurgias = async (req, res) => {
  const paciente_id = req.user.id;
  const r = await db.query(`SELECT * FROM cirurgias WHERE paciente_id=$1`, [paciente_id]);
  res.json(r.rows);
};
