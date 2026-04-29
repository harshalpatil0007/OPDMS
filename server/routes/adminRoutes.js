const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllDoctors, getAllPatients, addDoctor, removeDoctor, removePatient } = require('../controllers/adminController');
const { verifyToken, verifyRole } = require('../middleware/auth');

router.use(verifyToken);
router.use(verifyRole(['admin']));

router.get('/dashboard', getDashboardStats);
router.get('/doctors', getAllDoctors);
router.post('/doctors', addDoctor);
router.delete('/doctors/:id', removeDoctor);
router.get('/patients', getAllPatients);
router.delete('/patients/:id', removePatient);

module.exports = router;
