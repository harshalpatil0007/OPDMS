const { Doctor } = require('./models');
const bcrypt = require('bcryptjs');
const { sequelize } = require('./config/database');

const doctorsData = [
  { name: 'Dr. Shantanu Bhardwaj', email: 'shantanu@hospital.com', password: 'Shantanu', phone: '9876543210', specialization: 'Orthopedic', experience: 10, qualification: 'MBBS, MS Ortho', consultation_fees: 500, approval_status: 'approved' },
  { name: 'Dr. Tejas Patil', email: 'tejas@hospital.com', password: 'Tejas', phone: '9876543211', specialization: 'Orthopedic', experience: 8, qualification: 'MBBS, MS Ortho', consultation_fees: 400, approval_status: 'approved' },
  { name: 'Dr. Ramakant Patil', email: 'ramakant@hospital.com', password: 'Ramakant', phone: '9876543212', specialization: 'Orthopedic', experience: 12, qualification: 'MBBS, MS Ortho', consultation_fees: 600, approval_status: 'approved' },
  { name: 'Dr. Nilesh Rao', email: 'nilesh@hospital.com', password: 'Nilesh', phone: '9876543213', specialization: 'Neurosurgeon', experience: 15, qualification: 'MBBS, MCh Neuro', consultation_fees: 1000, approval_status: 'approved' },
  { name: 'Dr. Archana Kotkar', email: 'archana@hospital.com', password: 'Archana', phone: '9876543214', specialization: 'Neurosurgeon', experience: 9, qualification: 'MBBS, MCh Neuro', consultation_fees: 900, approval_status: 'approved' },
  { name: 'Dr. Mona Borole', email: 'mona@hospital.com', password: 'Mona', phone: '9876543215', specialization: 'Neurosurgeon', experience: 7, qualification: 'MBBS, MCh Neuro', consultation_fees: 850, approval_status: 'approved' },
  { name: 'Dr. Anand Sudhakarao Dank', email: 'anand@hospital.com', password: 'Anand', phone: '9876543216', specialization: 'Psychiatrist', experience: 11, qualification: 'MBBS, MD Psychiatry', consultation_fees: 700, approval_status: 'approved' },
  { name: 'Dr. Jeevan Rajput', email: 'jeevan@hospital.com', password: 'Jeevan', phone: '9876543217', specialization: 'Psychiatrist', experience: 6, qualification: 'MBBS, MD Psychiatry', consultation_fees: 600, approval_status: 'approved' },
  { name: 'Dr. Nilesh Kinge', email: 'kinge1@hospital.com', password: 'Nilesh', phone: '9876543218', specialization: 'Psychiatrist', experience: 8, qualification: 'MBBS, MD Psychiatry', consultation_fees: 650, approval_status: 'approved' },
  { name: 'Dr. Sneha Bhola', email: 'sneha@hospital.com', password: 'Sneha', phone: '9876543219', specialization: 'Gynaecologist', experience: 10, qualification: 'MBBS, MD Gynaecology', consultation_fees: 500, approval_status: 'approved' },
  { name: 'Dr. Priya Patni', email: 'priya@hospital.com', password: 'Priya', phone: '9876543220', specialization: 'Gynaecologist', experience: 7, qualification: 'MBBS, MD Gynaecology', consultation_fees: 450, approval_status: 'approved' },
  { name: 'Dr. Vishal Jain', email: 'vishal@hospital.com', password: 'Vishal', phone: '9876543221', specialization: 'Gynaecologist', experience: 9, qualification: 'MBBS, MD Gynaecology', consultation_fees: 550, approval_status: 'approved' },
  { name: 'Dr. Shraddha Patil', email: 'shraddha@hospital.com', password: 'Shraddha', phone: '9876543222', specialization: 'Radiologist', experience: 8, qualification: 'MBBS, MD Radiology', consultation_fees: 600, approval_status: 'approved' },
  { name: 'Dr. Swapnil Raverkar', email: 'swapnil@hospital.com', password: 'Swapnil', phone: '9876543223', specialization: 'Radiologist', experience: 6, qualification: 'MBBS, MD Radiology', consultation_fees: 550, approval_status: 'approved' },
  { name: 'Dr. Kaustubh Chaudhary', email: 'kaustubh@hospital.com', password: 'Kaustubh', phone: '9876543224', specialization: 'Radiologist', experience: 10, qualification: 'MBBS, MD Radiology', consultation_fees: 700, approval_status: 'approved' },
  { name: 'Dr. Nilesh Kinge', email: 'kinge2@hospital.com', password: 'Nilesh', phone: '9876543225', specialization: 'Radiologist', experience: 9, qualification: 'MBBS, MD Radiology', consultation_fees: 650, approval_status: 'approved' },
  { name: 'Dr. Sachin Patil', email: 'sachin@hospital.com', password: 'Sachin', phone: '9876543226', specialization: 'Radiologist', experience: 7, qualification: 'MBBS, MD Radiology', consultation_fees: 600, approval_status: 'approved' },
  { name: 'Dr. Yogesh Chaudhary', email: 'yogesh@hospital.com', password: 'Yogesh', phone: '9876543227', specialization: 'Radiologist', experience: 8, qualification: 'MBBS, MD Radiology', consultation_fees: 650, approval_status: 'approved' }
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Connection established successfully.');

    for (const data of doctorsData) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      await Doctor.findOrCreate({
        where: { email: data.email },
        defaults: { ...data, password: hashedPassword }
      });
      console.log(`Ensured doctor: ${data.name}`);
    }

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
