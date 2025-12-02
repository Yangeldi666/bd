const db = require('../config/database');

exports.taxaOcupacao = async (req, res) => {
  const r = await db.query(`
    SELECT COUNT(DISTINCT leito_id) AS ocupados,
           (SELECT COUNT(*) FROM leitos) AS total
    FROM leito_ocupacao WHERE end_at IS NULL
  `);

  res.json(r.rows[0]);
};

exports.consultasPorMedico = async (req, res) => {
  const r = await db.query(`
    SELECT u.name, COUNT(c.id) AS total
    FROM doctors d
    JOIN users u ON u.id = d.user_id
    LEFT JOIN consultas c ON c.medico_id = d.id
    GROUP BY u.name
    ORDER BY total DESC
  `);

  res.json(r.rows);
};

exports.especialidades = async (req, res) => {
  const r = await db.query(`
    SELECT specialty, COUNT(*) AS total
    FROM doctors
    GROUP BY specialty
    ORDER BY total DESC
  `);

  res.json(r.rows);
};
