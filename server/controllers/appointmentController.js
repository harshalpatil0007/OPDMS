const { Appointment, Patient, Doctor, Prescription } = require('../models');

// Helper to convert "09:00 AM" to "09:00:00" for MySQL TIME column
const formatTime = (timeStr) => {
  if (!timeStr) return null;
  // If already in 24h format HH:MM or HH:MM:SS
  if (/^\d{2}:\d{2}/.test(timeStr) && !timeStr.includes('AM') && !timeStr.includes('PM')) return timeStr;

  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') hours = '00';
  if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
  return `${String(hours).padStart(2, '0')}:${minutes}:00`;
};

// Book Appointment (Patient/Admin)
const bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time, reason } = req.body;
    let pid = patientId;
    if (req.user.role === 'patient') {
        pid = req.user.id;
    }
    
    const formattedTime = formatTime(time);
    
    const appointment = await Appointment.create({ 
      patientId: pid, 
      doctorId, 
      date, 
      time: formattedTime, 
      reason 
    });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View Appointments
const getAppointments = async (req, res) => {
  try {
    let where = {};
    if (req.user.role === 'patient') {
        where.patientId = req.user.id;
    } else if (req.user.role === 'doctor') {
        where.doctorId = req.user.id;
    }

    const appointments = await Appointment.findAll({
      where,
      include: [
        { model: Patient, attributes: ['id', 'name', 'email', 'phone', 'age', 'gender'] },
        { model: Doctor, attributes: ['id', 'name', 'specialization', 'consultation_fees'] },
        { model: Prescription }
      ],
      order: [['date', 'DESC']]
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Appointment Status (Doctor/Admin)
const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await Appointment.update({ status }, { where: { id } });
        res.json({ message: 'Appointment updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Appointment
const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        await Appointment.destroy({ where: { id } });
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add Prescription (Doctor)
const addPrescription = async (req, res) => {
    try {
        const { appointmentId, medication, disease, instructions } = req.body;
        const appointment = await Appointment.findByPk(appointmentId);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        const prescription = await Prescription.create({
            appointmentId,
            patientId: appointment.patientId,
            doctorId: appointment.doctorId,
            medication,
            disease,
            instructions
        });
        
        // Auto mark as completed
        await Appointment.update({ status: 'Completed' }, { where: { id: appointmentId }});

        res.status(201).json(prescription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get profile & medical history
const getMyHistory = async (req, res) => {
    try {
        if (req.user.role !== 'patient') return res.status(403).json({ message: 'Not a patient' });

        const appointments = await Appointment.findAll({
            where: { patientId: req.user.id },
            include: [
              { model: Doctor, attributes: ['id', 'name', 'specialization'] },
              { model: Prescription }
            ],
            order: [['date', 'DESC']]
        });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Release Clinical Information Pack (Automated based on payment for demo)
const releaseClinicalPack = async (req, res) => {
    try {
        const { id } = req.body;
        const appointment = await Appointment.findByPk(id);
        if (!appointment) return res.status(404).json({ message: 'Record not found' });

        // 1. Mark as Completed
        appointment.status = 'Completed';
        await appointment.save();

        // 2. Add System-Generated Prescription Record if missing
        const exists = await Prescription.findOne({ where: { appointmentId: id }});
        if (!exists) {
            await Prescription.create({
                appointmentId: id,
                patientId: appointment.patientId,
                doctorId: appointment.doctorId,
                medication: 'General Wellness Bundle (Multivitamins, Hydration Salts)',
                disease: 'Routine Check-up Recovery',
                instructions: 'Maintain healthy diet and regular hydration. Follow-up if symptoms persist.'
            });
        }

        res.json({ message: 'Clinical data released successfully!' });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { bookAppointment, getAppointments, updateAppointment, deleteAppointment, addPrescription, getMyHistory, releaseClinicalPack };
