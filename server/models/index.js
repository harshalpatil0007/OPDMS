const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Admin = sequelize.define('Admin', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false }
});

const Doctor = sequelize.define('Doctor', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  specialization: { type: DataTypes.STRING, allowNull: false, defaultValue: 'General' },
  experience: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  qualification: { type: DataTypes.STRING, allowNull: false, defaultValue: 'MBBS' },
  consultation_fees: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 },
  approval_status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' }
});

const Patient = sequelize.define('Patient', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  gender: { type: DataTypes.ENUM('male', 'female', 'other'), allowNull: false, defaultValue: 'other' },
  address: { type: DataTypes.TEXT },
  medical_history: { type: DataTypes.TEXT }
});

const Appointment = sequelize.define('Appointment', {
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.TIME, allowNull: false },
  reason: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('Scheduled', 'Completed', 'Cancelled'), defaultValue: 'Scheduled' }
}, {
  indexes: [
    {
      unique: true,
      fields: ['doctorId', 'date', 'time'] // Prevent double booking
    }
  ]
});

const Prescription = sequelize.define('Prescription', {
  medication: { type: DataTypes.TEXT, allowNull: false },
  disease: { type: DataTypes.STRING },
  instructions: { type: DataTypes.TEXT }
});

const ContactMessage = sequelize.define('ContactMessage', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  subject: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.ENUM('unread', 'read'), defaultValue: 'unread' }
});

// Relationships

// Doctor/Patient -> Appointment
Doctor.hasMany(Appointment, { foreignKey: 'doctorId', onDelete: 'CASCADE' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });

Patient.hasMany(Appointment, { foreignKey: 'patientId', onDelete: 'CASCADE' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });

// Appointments -> Prescription
Appointment.hasOne(Prescription, { foreignKey: 'appointmentId', onDelete: 'CASCADE' });
Prescription.belongsTo(Appointment, { foreignKey: 'appointmentId' });

Patient.hasMany(Prescription, { foreignKey: 'patientId', onDelete: 'CASCADE' });
Prescription.belongsTo(Patient, { foreignKey: 'patientId' });

Doctor.hasMany(Prescription, { foreignKey: 'doctorId', onDelete: 'CASCADE' });
Prescription.belongsTo(Doctor, { foreignKey: 'doctorId' });

module.exports = {
  sequelize,
  Admin,
  Doctor,
  Patient,
  Appointment,
  Prescription,
  ContactMessage
};
