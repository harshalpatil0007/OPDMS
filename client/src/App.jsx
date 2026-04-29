import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedLayout from './components/Layout/ProtectedLayout';
import Landing from './pages/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import AdminDashboard from './pages/Admin/Dashboard';
import ManageDoctors from './pages/Admin/ManageDoctors';
import ManagePatients from './pages/Admin/ManagePatients';

import DoctorDashboard from './pages/Doctor/Dashboard';
import Appointments from './pages/Doctor/Appointments';

import PatientDashboard from './pages/Patient/Dashboard';
import BookAppointment from './pages/Patient/BookAppointment';
import History from './pages/Patient/History';
import Prescriptions from './pages/Patient/Prescriptions';
import Payments from './pages/Patient/Payments';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedLayout allowedRoles={['admin']} />}>
          <Route index element={<AdminDashboard />} />
          <Route path="doctors" element={<ManageDoctors />} />
          <Route path="patients" element={<ManagePatients />} />
        </Route>

        {/* Doctor Routes */}
        <Route path="/doctor" element={<ProtectedLayout allowedRoles={['doctor']} />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="appointments" element={<Appointments />} />
        </Route>

        {/* Patient Routes */}
        <Route path="/patient" element={<ProtectedLayout allowedRoles={['patient']} />}>
          <Route index element={<PatientDashboard />} />
          <Route path="book" element={<BookAppointment />} />
          <Route path="history" element={<History />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="payments" element={<Payments />} />
        </Route>

        {/* Shared profile */}
        <Route path="/profile" element={<ProtectedLayout allowedRoles={['admin','doctor','patient']} />}>
          <Route index element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
