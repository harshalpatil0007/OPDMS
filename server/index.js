const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { connectDB, sequelize } = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const contactRoutes = require('./routes/contactRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize DB properly
connectDB().then(() => {
    sequelize.sync({ alter: true }).then(() => {
        console.log('Database synced');
    }).catch(err => {
        console.error('Error syncing DB:', err.message);
    });
});

// Seed Logic (Temporary for development)
app.get('/api/seedPrescription', async (req, res) => {
    try {
        const { Doctor, Patient, Appointment, Prescription, Admin } = require('./models');
        const bcrypt = require('bcryptjs');
        const password = await bcrypt.hash('password123', 10);

        // Seed Admin
        const adExists = await Admin.findOne({ where: { email: 'admin@admin.com' }});
        if (!adExists) {
            await Admin.create({ name: 'System Admin', email: 'admin@admin.com', password, phone: '0000000000' });
        }

        // 1. Ensure Doctor
        let doc = await Doctor.findOne({ where: { email: 'dr.anil@aurora.com' }});
        if (!doc) {
            doc = await Doctor.create({ 
                name: 'Anil Deshpande', email: 'dr.anil@aurora.com', password, phone: '9876543210',
                specialization: 'Cardiology', experience: 15, qualification: 'MD, DM', consultation_fees: 1200, 
                approval_status: 'approved' 
            });
        }
        // 2. Ensure Tejas Patil (from user screenshot)
        let doc2 = await Doctor.findOne({ where: { email: 'tejas@hospital.com' }});
        if (!doc2) {
            await Doctor.create({ 
                name: 'Tejas Patil', email: 'tejas@hospital.com', password, phone: '9000000001',
                specialization: 'Orthopedic', experience: 10, qualification: 'MS (Ortho)', consultation_fees: 400, 
                approval_status: 'approved' 
            });
        }

        // 2. Ensure Patient (Using the current user name as reference)
        let pat = await Patient.findOne({ where: { name: 'Pratik Agashe' } });
        if (!pat) {
            pat = await Patient.create({
                name: 'Pratik Agashe', email: 'pratik@gmail.com', password, phone: '1234567890',
                age: 28, gender: 'Male', address: 'Pune, India'
            });
        }

        // Check if we already seeded these specific appointments
        const existingApts = await Appointment.count({ where: { patientId: pat.id }});
        if (existingApts === 0) {
            // 3. Create Completed Appointment
            const appointment = await Appointment.create({
                patientId: pat.id, doctorId: doc.id, date: '2026-03-20', time: '10:00:00',
                status: 'Completed', reason: 'Experiencing heart palpitations and chest discomfort'
            });

            // 4. Detailed Prescription
            await Prescription.create({
                appointmentId: appointment.id, patientId: pat.id, doctorId: doc.id,
                medication: 'Metoprolol 25mg (Ecosprin), Atorvastatin 10mg',
                disease: 'Hypertension Control & Preventive Care',
                instructions: 'Metoprolol: One tab after breakfast daily. Ecosprin: One tab after dinner. Carry out Lipid Profile test next week.'
            });

            // Second one
            const appointment2 = await Appointment.create({
                patientId: pat.id, doctorId: doc.id, date: '2026-03-26', time: '15:30:00',
                status: 'Completed', reason: 'Follow-up for blood pressure'
            });

            await Prescription.create({
                appointmentId: appointment2.id, patientId: pat.id, doctorId: doc.id,
                medication: 'Continue Metoprolol 25mg, Add Vitamin B12 Supplements',
                disease: 'Stable Hypertension',
                instructions: 'BP is stable. Continue same dosage. B12 once daily for 15 days.'
            });
        }

        res.json({ message: 'Dummy medical analytics seeded successfully!' });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// Public info route (get all doctors for visitors)
app.get('/api/public/doctors', async (req, res) => {
    try {
        const { Doctor } = require('./models');
        const doctors = await Doctor.findAll({
            attributes: ['id', 'name', 'email', 'phone', 'specialization', 'experience', 'consultation_fees']
        });
        res.json(doctors);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Restart to apply changes
