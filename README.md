# Fullstack SERN Hospital Management System (Enterprise Setup)

## Setup Instructions
You now have a complete, production-ready SERN architecture built with React, Tailwind, Redux, Node.js, Express, and MySQL.

### 1. Database Setup (MySQL Required)
Make sure you have a local MySQL server running (via XAMPP, Workbench, or natively).
1. Create the database by running the command in your MySQL terminal:
   ```sql
   CREATE DATABASE hms_db;
   ```
2. Open `server/.env` and update your MySQL credentials:
   ```env
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   ```

### 2. Install Dependencies & Start
From the project root folder (`New folder`):
```bash
# This sets up both backend and frontend dependencies
npm run install-all

# Starts both servers via Concurrently
npm run dev
```

### 3. Usage & Seeding
- **Vite React UI**: `http://localhost:5173`
- **Express API Docs**: `http://localhost:5000/api`

**Create an Admin:**
In a separate terminal, to create an immediate system admin account, run:
```bash
Invoke-RestMethod -Uri http://localhost:5000/api/seedAdmin -Method Post
```
This generates the admin login: `admin@admin.com` | `admin123`

## Features Included
- **Tailwind CSS UI**: Fully responsive cards, modals, interactive sidebar navigation utilizing Lucide icons.
- **Redux Toolkit**: Secure Contexts holding Auth state (Token & Profile Data) globally.
- **Authentication**: JWT Based Auth via secure login and registration routes.
- **Sequelize MVC**: Complete relationship mapping between Users -> Doctors/Patients -> Appointments -> Prescriptions.
- **Data Visualizations**: Recharts/Chart.js Bar charts implemented in the Admin Dashboard comparing completed vs scheduled appointments.

## Deployment Status
To deploy:
1. Copy the `client` folder to Vercel. 
   - Build string: `npm run build`
   - Output dir: `dist`
2. Push `server` to a platform like Render or Railway. Make sure to bind process.env.DATABASE_URL to your remote MySQL server connection string.
