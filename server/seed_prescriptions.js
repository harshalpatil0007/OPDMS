const { Doctor, Patient, Appointment, Prescription } = require('./models');
const { sequelize } = require('./models');

async function seed() {
    try {
        await sequelize.authenticate();
        console.log('Connection established.');

        const patient = await Patient.findOne({ where: { name: 'Pratik Agashe' } });
        if (!patient) {
            console.error('Patient Pratik Agashe not found. Please register first.');
            process.exit(1);
        }

        const doctors = await Doctor.findAll();
        if (doctors.length === 0) {
            console.error('No doctors found. Please add doctors first.');
            process.exit(1);
        }

        const doc = doctors[0];

        // Create a completed appointment
        const appointment = await Appointment.create({
            patientId: patient.id,
            doctorId: doc.id,
            date: '2026-03-25',
            time: '10:00:00',
            status: 'Completed',
            reason: 'Persistent cough and fever'
        });

        // Add prescription
        await Prescription.create({
            appointmentId: appointment.id,
            patientId: patient.id,
            doctorId: doc.id,
            medication: 'Amoxicillin 500mg, Paracetamol 650mg',
            disease: 'Upper Respiratory Infection',
            instructions: 'Take Amoxicillin twice a day for 5 days. Paracetamol every 6 hours as needed for fever.'
        });

        // Second one
        const appointment2 = await Appointment.create({
            patientId: patient.id,
            doctorId: doc.id,
            date: '2026-03-20',
            time: '14:30:00',
            status: 'Completed',
            reason: 'Routine health checkup'
        });

        await Prescription.create({
            appointmentId: appointment2.id,
            patientId: patient.id,
            doctorId: doc.id,
            medication: 'Multivitamin Supplements, Vitamin D3',
            disease: 'General Weakness',
            instructions: 'One tablet daily after breakfast for 30 days.'
        });

        console.log('Dummy prescriptions seeded successfully for Pratik Agashe!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding:', err);
        process.exit(1);
    }
}

seed();
