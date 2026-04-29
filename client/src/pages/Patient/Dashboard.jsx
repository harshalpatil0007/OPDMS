import { useState, useEffect } from 'react';
import { User as UserIcon, Calendar, Activity, Pill, History, ArrowRight } from 'lucide-react';
import api from '../../utils/api';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

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

  const upcomingVisits = appointments.filter(a => a.status === 'Scheduled');
  const recentPrescriptions = appointments.filter(a => a.status === 'Completed' && a.Prescription).slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="card text-center sm:text-left flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white border-0 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-colors duration-500" />
        <div className="relative z-10">
          <h1 className="text-4xl font-black tracking-tight">Hello, {user?.name}</h1>
          <p className="text-blue-100 mt-2 font-medium opacity-90">Manage your health journeys and digital clinical records</p>
        </div>
        <UserIcon size={64} className="text-white mt-6 sm:mt-0 opacity-20 relative z-10 group-hover:scale-110 transition-transform duration-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* UPCOMING VISITS */}
          <div className="card border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-6 border-b border-slate-50 dark:border-slate-800 pb-4">
                <h3 className="text-xl font-bold dark:text-white flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-xl">
                        <Calendar size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    Upcoming Visits
                </h3>
                <Link to="/patient/book" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                    Book New <ArrowRight size={12} />
                </Link>
            </div>
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2].map(i => <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>)}
              </div>
            ) : upcomingVisits.length === 0 ? (
              <div className="py-12 text-center">
                 <div className="inline-flex p-4 bg-slate-50 dark:bg-slate-900 rounded-full mb-3">
                    <History size={32} className="text-slate-300" />
                 </div>
                 <p className="text-slate-400 text-sm font-medium">No scheduled appointments</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingVisits.map(apt => (
                  <div key={apt.id} className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl flex justify-between items-center hover:bg-white dark:hover:bg-slate-800 transition-all group">
                    <div>
                        <p className="font-black text-slate-800 dark:text-white tracking-tight">{(apt.Doctor?.name || '').startsWith('Dr.') ? apt.Doctor?.name : `Dr. ${apt.Doctor?.name || 'Specialist'}`}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{apt.date} • {apt.time}</p>
                    </div>
                    <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">Scheduled</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RECENT PRESCRIPTIONS */}
          <div className="card border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-6 border-b border-slate-50 dark:border-slate-800 pb-4">
                <h3 className="text-xl font-bold dark:text-white flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl">
                        <Activity size={20} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    Recent Prescriptions
                </h3>
                <Link to="/patient/prescriptions" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
                    View All <ArrowRight size={12} />
                </Link>
            </div>
            
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2].map(i => <div key={i} className="h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>)}
              </div>
            ) : recentPrescriptions.length === 0 ? (
              <div className="py-12 text-center">
                 <div className="inline-flex p-4 bg-slate-50 dark:bg-slate-900 rounded-full mb-3">
                    <Pill size={32} className="text-slate-300" />
                 </div>
                 <p className="text-slate-400 text-sm font-medium">No medical prescriptions available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentPrescriptions.map(apt => (
                  <div key={apt.id} className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-all group">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-slate-100 dark:border-slate-600 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all duration-300">
                              <Pill size={16} />
                           </div>
                           <div>
                              <p className="font-bold text-slate-800 dark:text-white text-sm truncate max-w-[150px]">{apt.Prescription.medication}</p>
                              <p className="text-[10px] font-bold text-slate-400 italic">By {(apt.Doctor?.name || '').startsWith('Dr.') ? apt.Doctor?.name : `Dr. ${apt.Doctor?.name}`}</p>
                           </div>
                        </div>
                        <span className="text-[10px] font-black text-slate-300 uppercase shrink-0 pt-1">{apt.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-6 text-[11px] text-slate-400 text-center font-medium italic">
                Records are released automatically after specialist approval or payment completion.
            </p>
          </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
