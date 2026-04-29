import { useState, useEffect } from 'react';
import { Stethoscope, Calendar, Clock } from 'lucide-react';
import api from '../../utils/api';
import { useSelector } from 'react-redux';

const DoctorDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await api.get('/appointments');
        setAppointments(data);
      } catch (error) {
        console.error('Failed to fetch appointments', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="space-y-6">
      <div className="card text-center sm:text-left flex flex-col sm:flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Welcome back, {(user?.name || '').startsWith('Dr.') ? user?.name : `Dr. ${user?.name || 'Doctor'}`}</h1>
          <p className="text-gray-500">Here is your daily overview</p>
        </div>
        <Stethoscope size={48} className="text-blue-500 mt-4 sm:mt-0" />
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2 dark:text-white flex items-center gap-2">
            <Calendar size={20} className="text-blue-500" /> Today's Pipeline
        </h3>
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ) : appointments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No appointments assigned to you currently.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map(apt => (
              <div key={apt.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors uppercase tracking-tight">{apt.Patient?.name || 'Guest Patient'}</h4>
                  <p className="text-xs font-bold text-slate-400 mt-1 flex items-center gap-2">
                    <Calendar size={12} className="text-slate-500" /> {apt.date} <span className="w-1 h-1 rounded-full bg-slate-200" /> <Clock size={12} className="text-slate-500" /> {apt.time}
                  </p>
                </div>
                <span className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-xs font-semibold ${
                  apt.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  apt.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
