import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, X, CheckCircle, Trash2 } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({ 
    patientId: '', 
    doctorId: '', 
    date: '', 
    time: '' 
  });

  const fetchData = async () => {
    try {
      const [aptRes, patRes, docRes] = await Promise.all([
        axios.get(`${API_URL}/appointments`),
        axios.get(`${API_URL}/patients`),
        axios.get(`${API_URL}/doctors`)
      ]);
      setAppointments(aptRes.data);
      setPatients(patRes.data);
      setDoctors(docRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/appointments`, {
        PatientId: formData.patientId,
        DoctorId: formData.doctorId,
        date: formData.date,
        time: formData.time
      });
      setIsModalOpen(false);
      setFormData({ patientId: '', doctorId: '', date: '', time: '' });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/appointments/${id}`, { status });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`${API_URL}/appointments/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex-between">
        <div>
          <h1>Appointments</h1>
          <p style={{ color: 'var(--text-muted)' }}>Schedule and track patient visits.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Schedule Appointment
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(a => (
              <tr key={a.id}>
                <td>#{a.id}</td>
                <td style={{ fontWeight: '500' }}>{a.Patient?.name || 'Unknown'}</td>
                <td style={{ color: 'var(--text-muted)' }}>{a.Doctor?.name || 'Unknown'}</td>
                <td>
                  <div>{a.date}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{a.time}</div>
                </td>
                <td>
                  <span className={`badge ${
                    a.status === 'Completed' ? 'badge-success' : 
                    a.status === 'Cancelled' ? 'badge-danger' : 'badge-warning'
                  }`}>
                    {a.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {a.status === 'Scheduled' && (
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '6px' }}
                        onClick={() => updateStatus(a.id, 'Completed')}
                        title="Mark Completed"
                      >
                        <CheckCircle size={16} color="var(--success)" />
                      </button>
                    )}
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '6px' }}
                      onClick={() => deleteAppointment(a.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} color="var(--danger)" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                  No appointments scheduled.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Schedule Visit</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Patient</label>
                <select className="form-control" name="patientId" value={formData.patientId} onChange={handleChange} required>
                  <option value="">Select Patient</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Doctor</label>
                <select className="form-control" name="doctorId" value={formData.doctorId} onChange={handleChange} required>
                  <option value="">Select Doctor</option>
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input type="time" className="form-control" name="time" value={formData.time} onChange={handleChange} required />
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
