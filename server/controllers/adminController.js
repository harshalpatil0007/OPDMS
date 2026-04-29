const bcrypt = require('bcryptjs');
const { Doctor, Patient, Appointment, Prescription } = require('../models');

// Admin only: Get dashboard analytics
const getDashboardStats = async (req, res) => {
  try {
    const totalPatients = await Patient.count();
    const totalDoctors = await Doctor.count();
    const totalAppointments = await Appointment.count();
    
    // recent appointments to show in dashboard chart (e.g. grouped by status)
    const scheduled = await Appointment.count({ where: { status: 'Scheduled' } });
    const completed = await Appointment.count({ where: { status: 'Completed' } });
    const cancelled = await Appointment.count({ where: { status: 'Cancelled' } });

    res.json({
      counts: { patients: totalPatients, doctors: totalDoctors, appointments: totalAppointments },
      chartData: { scheduled, completed, cancelled }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin only: Manage Doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addDoctor = async (req, res) => {
  try {
    const { name, email, password, phone, specialization, experience, qualification, consultation_fees } = req.body;
    
    // Check if doctor exists
    const exists = await Doctor.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'Doctor with this email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = await Doctor.create({
      name, email, password: hashedPassword, phone, specialization, experience, qualification, consultation_fees,
      approval_status: 'approved' // Admins add pre-approved doctors
    });

    res.status(201).json({ message: 'Doctor added successfully', doctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeDoctor = async (req, res) => {
  try {
    await Doctor.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Doctor removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin only: Manage Patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removePatient = async (req, res) => {
  try {
    await Patient.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Patient removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getDashboardStats, getAllDoctors, getAllPatients, addDoctor, removeDoctor, removePatient };
