import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, X } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/doctors';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', specialization: '', phone: '' });

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(API_URL);
      setDoctors(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setIsModalOpen(false);
      setFormData({ name: '', specialization: '', phone: '' });
      fetchDoctors();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex-between">
        <div>
          <h1>Medical Staff</h1>
          <p style={{ color: 'var(--text-muted)' }}>View and manage hospital doctors.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Add Doctor
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Doctor Name</th>
              <th>Specialization</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map(d => (
              <tr key={d.id}>
                <td>#{d.id}</td>
                <td style={{ fontWeight: '500', color: 'white' }}>{d.name.startsWith('Dr.') ? d.name : `Dr. ${d.name}`}</td>
                <td>
                  <span className="badge badge-warning">{d.specialization}</span>
                </td>
                <td>{d.phone}</td>
              </tr>
            ))}
            {doctors.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                  No doctors found. Add medical staff to the system.
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
              <h2 className="modal-title">New Doctor</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-control" name="name" placeholder="E.g. John Smith" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Specialization</label>
                <input className="form-control" name="specialization" placeholder="E.g. Cardiology" value={formData.specialization} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Contact Number</label>
                <input className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Doctor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
