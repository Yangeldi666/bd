const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');
const conselhoController = require('../controllers/conselho.controller');

router.get('/ocupacao', authenticateToken, requireRole('board'), conselhoController.taxaOcupacao);
router.get('/consultas-por-medico', authenticateToken, requireRole('board'), conselhoController.consultasPorMedico);
router.get('/especialidades', authenticateToken, requireRole('board'), conselhoController.especialidades);

module.exports = router;
