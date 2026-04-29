import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Stethoscope, CalendarCheck, Activity } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [patientsRes, doctorsRes, appointmentsRes] = await Promise.all([
          axios.get(`${API_URL}/patients`),
          axios.get(`${API_URL}/doctors`),
          axios.get(`${API_URL}/appointments`)
        ]);

        setStats({
          patients: patientsRes.data.length,
          doctors: doctorsRes.data.length,
          appointments: appointmentsRes.data.length
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard Output</h1>
        <p style={{ color: 'var(--text-muted)' }}>Overview of hospital operations.</p>
      </div>

      <div className="grid grid-cols-3">
        <div className="card stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Patients</h3>
            <p>{loading ? '...' : stats.patients}</p>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon">
            <Stethoscope size={24} />
          </div>
          <div className="stat-info">
            <h3>Registered Doctors</h3>
            <p>{loading ? '...' : stats.doctors}</p>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon">
            <CalendarCheck size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Appointments</h3>
            <p>{loading ? '...' : stats.appointments}</p>
          </div>
        </div>
      </div>
      
      <div className="card" style={{ marginTop: '24px' }}>
        <h2>System Status</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Activity color="var(--success)" />
            <span style={{ color: 'var(--success)', fontWeight: '500' }}>All systems operational</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
