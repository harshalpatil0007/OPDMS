CREATE DATABASE IF NOT EXISTS hms_db;
USE hms_db;

-- =========================
-- ADMIN TABLE
-- =========================
CREATE TABLE Admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =========================
-- DOCTORS TABLE
-- =========================
CREATE TABLE Doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    experience INT NOT NULL,
    qualification VARCHAR(255) NOT NULL,
    consultation_fees DECIMAL(10,2) NOT NULL,
    approval_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =========================
-- PATIENTS TABLE
-- =========================
CREATE TABLE Patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    age INT NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    address TEXT,
    medical_history TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =========================
-- APPOINTMENTS TABLE
-- =========================
CREATE TABLE Appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT NOT NULL,
    doctorId INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    reason TEXT,
    status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (patientId) REFERENCES Patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctorId) REFERENCES Doctors(id) ON DELETE CASCADE,

    -- Prevent double booking
    UNIQUE (doctorId, date, time)
);

-- =========================
-- PRESCRIPTIONS TABLE
-- =========================
CREATE TABLE Prescriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    appointmentId INT NOT NULL,
    patientId INT NOT NULL,
    doctorId INT NOT NULL,
    medication TEXT NOT NULL,
    disease VARCHAR(255),
    instructions TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (appointmentId) REFERENCES Appointments(id) ON DELETE CASCADE,
    FOREIGN KEY (patientId) REFERENCES Patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctorId) REFERENCES Doctors(id) ON DELETE CASCADE
);

-- =========================
-- CONTACT MESSAGES TABLE
-- =========================
CREATE TABLE ContactMessages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('unread', 'read') DEFAULT 'unread',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =========================
-- INDEXES (Performance)
-- =========================
CREATE INDEX idx_patient ON Appointments(patientId);
CREATE INDEX idx_doctor ON Appointments(doctorId);
CREATE INDEX idx_prescription_appointment ON Prescriptions(appointmentId);

show tables;