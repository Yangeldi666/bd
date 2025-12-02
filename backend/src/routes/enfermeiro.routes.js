const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');
const enfermeiroController = require('../controllers/enfermeiro.controller');

router.get('/alocacoes', authenticateToken, requireRole('nurse'), enfermeiroController.minhasAlocacoes);
router.get('/historico', authenticateToken, requireRole('nurse'), enfermeiroController.historicoPlantoes);

module.exports = router;
