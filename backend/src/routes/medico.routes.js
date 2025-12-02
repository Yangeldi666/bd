const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');
const medicoController = require('../controllers/medico.controller');

router.get('/agenda', authenticateToken, requireRole('doctor'), medicoController.verAgenda);
router.post('/cirurgia', authenticateToken, requireRole('doctor'), medicoController.solicitarCirurgia);
router.post('/alocar-leito', authenticateToken, requireRole('doctor'), medicoController.alocarLeito);
router.post('/alocar-enfermeiro', authenticateToken, requireRole('doctor'), medicoController.alocarEnfermeiro);

module.exports = router;
