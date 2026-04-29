const express = require('express');
const router = express.Router();
const { bookAppointment, getAppointments, updateAppointment, deleteAppointment, addPrescription, getMyHistory, releaseClinicalPack } = require('../controllers/appointmentController');
const { verifyToken, verifyRole } = require('../middleware/auth');

router.use(verifyToken);

// All roles can get appointments (Patient gets theirs, Doctor gets theirs, Admin gets all)
router.get('/', getAppointments);
router.post('/book', bookAppointment);
router.put('/:id', verifyRole(['admin', 'doctor', 'patient']), updateAppointment);
router.delete('/:id', verifyRole(['admin']), deleteAppointment);

// Prescriptions / History
router.post('/prescription', verifyRole(['doctor']), addPrescription);
router.get('/history/me', verifyRole(['patient']), getMyHistory);
router.post('/release-clinical-pack', verifyRole(['patient', 'admin']), releaseClinicalPack);

module.exports = router;
