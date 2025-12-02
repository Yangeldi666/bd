const db = require('../config/database');

exports.minhasAlocacoes = async (req, res) => {
  const nurse_id = req.user.id;

  const r = await db.query(
    `SELECT * FROM cirurgia_enfermeiro WHERE nurse_id=$1`,
    [nurse_id]
  );

  res.json(r.rows);
};

exports.historicoPlantoes = async (req, res) => {
  const nurse_id = req.user.id;

  const r = await db.query(
    `SELECT * FROM plantao_nurse WHERE nurse_id=$1 ORDER BY start_at DESC`,
    [nurse_id]
  );

  res.json(r.rows);
};
