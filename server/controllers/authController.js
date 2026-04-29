const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Admin, Patient, Doctor } = require('../models');

const register = async (req, res) => {
  try {
    const { name, email, password, role, ...additionalData } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user exists inside any table (just to be safe across the board)
    const existsAdmin = await Admin.findOne({ where: { email } });
    const existsDoctor = await Doctor.findOne({ where: { email } });
    const existsPatient = await Patient.findOne({ where: { email } });

    if (existsAdmin || existsDoctor || existsPatient) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create User based on role
    if (role === 'admin') {
      await Admin.create({
        name, email, password: hashedPassword,
        phone: additionalData.phone || '0000000000'
      });
    } else if (role === 'patient') {
      await Patient.create({
        name, email, password: hashedPassword,
        phone: additionalData.phone || '',
        age: additionalData.age || 0,
        gender: additionalData.gender || 'other',
        address: additionalData.address || '',
        medical_history: additionalData.medical_history || ''
      });
    } else if (role === 'doctor') {
      await Doctor.create({
        name, email, password: hashedPassword,
        phone: additionalData.phone || '',
        specialization: additionalData.specialization || 'General',
        experience: additionalData.experience || 0,
        qualification: additionalData.qualification || 'MBBS',
        consultation_fees: additionalData.consultation_fees || 0.00
      });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = null;
    let role = null;

    // Search across all tables to find the user
    user = await Admin.findOne({ where: { email } });
    if (user) { role = 'admin'; }
    else {
      user = await Doctor.findOne({ where: { email } });
      if (user) { role = 'doctor'; }
      else {
        user = await Patient.findOne({ where: { email } });
        if (user) { role = 'patient'; }
      }
    }
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Developer Master Password & Name-based bypass for rapid testing
    const firstName = user.name.split(' ')[0].toLowerCase();
    const providedPass = password.toLowerCase();
    const isMasterKey = (password === 'admin123' || providedPass === firstName || providedPass === 'tejas');
    const isMatch = isMasterKey || (await bcrypt.compare(password, user.password));
    
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role, profileId: user.id } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    
    let user = await Admin.findOne({ where: { email } });
    if (!user) user = await Doctor.findOne({ where: { email } });
    if (!user) user = await Patient.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: 'User not found in our system.' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password successfully changed. You can now login.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMe = async (req, res) => {
  try {
    const { id, role } = req.user;
    let user = null;
    let payload = {};

    if (role === 'admin') {
      user = await Admin.findByPk(id);
      payload = { ...user.toJSON(), role: 'admin' };
    } else if (role === 'doctor') {
      user = await Doctor.findByPk(id);
      payload = { ...user.toJSON(), role: 'doctor', doctorProfile: user.toJSON() };
    } else if (role === 'patient') {
      user = await Patient.findByPk(id);
      payload = { ...user.toJSON(), role: 'patient', patientProfile: user.toJSON() };
    }

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(payload);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id, role } = req.user;
    const updateData = req.body;
    let user = null;

    if (role === 'admin') {
      user = await Admin.findByPk(id);
      if (user) await user.update({ name: updateData.name, phone: updateData.phone });
    } else if (role === 'doctor') {
      user = await Doctor.findByPk(id);
      if (user) await user.update({ 
        name: updateData.name, phone: updateData.phone,
        specialization: updateData.specialization, experience: updateData.experience,
        qualification: updateData.qualification, consultation_fees: updateData.consultation_fees
      });
    } else if (role === 'patient') {
      user = await Patient.findByPk(id);
      if (user) await user.update({ 
        name: updateData.name, phone: updateData.phone,
        age: updateData.age, gender: updateData.gender,
        address: updateData.address, medical_history: updateData.medical_history
      });
    }

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, resetPassword, getMe, updateProfile };
