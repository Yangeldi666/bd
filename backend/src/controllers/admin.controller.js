const db = require('../config/database');

// ---------- MÉDICOS ----------
exports.criarMedico = async (req, res) => {
  const { email, senha, nome, especialidade, crm } = req.body;

  const user = await db.query(
    `INSERT INTO users (email,password_hash,name,role)
     VALUES ($1, crypt($2, gen_salt('bf')), $3, 'doctor') RETURNING id`,
    [email, senha, nome]
  );

  const medico = await db.query(
    `INSERT INTO doctors (user_id, specialty, crm)
     VALUES ($1,$2,$3) RETURNING *`,
    [user.rows[0].id, especialidade, crm]
  );

  res.json(medico.rows[0]);
};

exports.listarMedicos = async (req, res) => {
  const r = await db.query(
    `SELECT d.id, u.name, d.specialty, d.crm
     FROM doctors d JOIN users u ON u.id = d.user_id`
  );
  res.json(r.rows);
};

// ---------- ENFERMEIROS ----------
exports.criarEnfermeiro = async (req, res) => {
  const { email, senha, nome, registro } = req.body;

  const user = await db.query(
    `INSERT INTO users (email,password_hash,name,role)
     VALUES ($1, crypt($2, gen_salt('bf')), $3, 'nurse') RETURNING id`,
    [email, senha, nome]
  );

  const nurse = await db.query(
    `INSERT INTO nurses (user_id, registration)
     VALUES ($1,$2) RETURNING *`,
    [user.rows[0].id, registro]
  );

  res.json(nurse.rows[0]);
};

exports.listarEnfermeiros = async (req, res) => {
  const r = await db.query(
    `SELECT n.id, u.name, n.registration
     FROM nurses n JOIN users u ON u.id = n.user_id`
  );
  res.json(r.rows);
};

// ---------- LEITOS ----------
exports.criarLeito = async (req, res) => {
  const { code, type } = req.body;
  const r = await db.query(
    `INSERT INTO leitos (code,type) VALUES ($1,$2) RETURNING *`,
    [code, type]
  );
  res.json(r.rows[0]);
};

exports.listarLeitos = async (req, res) => {
  const r = await db.query('SELECT * FROM leitos');
  res.json(r.rows);
};

// ---------- CONSULTÓRIOS ----------
exports.criarConsultorio = async (req, res) => {
  const { code, descricao } = req.body;
  const r = await db.query(
    `INSERT INTO consultorios (code,description) VALUES ($1,$2) RETURNING *`,
    [code, descricao]
  );
  res.json(r.rows[0]);
};

exports.listarConsultorios = async (req, res) => {
  const r = await db.query('SELECT * FROM consultorios');
  res.json(r.rows);
};

// ---------- ALOCAÇÃO DE CONSULTÓRIOS ----------
exports.alocarConsultorio = async (req, res) => {
  const { medico_id, consultorio_id, data } = req.body;

  const conflito = await db.query(
    `SELECT 1 FROM alocacoes_consultorio
     WHERE consultorio_id=$1 AND date=$2`,
    [consultorio_id, data]
  );

  if (conflito.rowCount > 0) {
    return res.status(400).json({ error: "Consultório já ocupado nesse dia" });
  }

  const r = await db.query(
    `INSERT INTO alocacoes_consultorio (medico_id, consultorio_id, date)
     VALUES ($1,$2,$3) RETURNING *`,
    [medico_id, consultorio_id, data]
  );

  res.json(r.rows[0]);
};
