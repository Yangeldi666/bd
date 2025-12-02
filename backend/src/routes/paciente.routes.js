const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');
const pacienteController = require('../controllers/paciente.controller');

router.post('/consultas', authenticateToken, requireRole('patient'), pacienteController.marcarConsulta);
router.get('/consultas', authenticateToken, requireRole('patient'), pacienteController.minhasConsultas);
router.get('/cirurgias', authenticateToken, requireRole('patient'), pacienteController.minhasCirurgias);

module.exports = router;
