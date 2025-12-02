const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');
const adminController = require('../controllers/admin.controller');

// Médicos
router.post('/medicos', authenticateToken, requireRole('admin'), adminController.criarMedico);
router.get('/medicos', authenticateToken, requireRole('admin'), adminController.listarMedicos);

// Enfermeiros
router.post('/enfermeiros', authenticateToken, requireRole('admin'), adminController.criarEnfermeiro);
router.get('/enfermeiros', authenticateToken, requireRole('admin'), adminController.listarEnfermeiros);

// Leitos
router.post('/leitos', authenticateToken, requireRole('admin'), adminController.criarLeito);
router.get('/leitos', authenticateToken, requireRole('admin'), adminController.listarLeitos);

// Consultórios
router.post('/consultorios', authenticateToken, requireRole('admin'), adminController.criarConsultorio);
router.get('/consultorios', authenticateToken, requireRole('admin'), adminController.listarConsultorios);

// Alocação médico → consultório
router.post('/alocar-consultorio', authenticateToken, requireRole('admin'), adminController.alocarConsultorio);

module.exports = router;
