import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { FileText, Calendar, Activity, Clock } from 'lucide-react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await api.get('/appointments/history/me');
      setHistory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4 border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold dark:text-white">Medical History</h1>
        <p className="text-slate-500 text-sm mt-1">Review your past visits, prescriptions, and medical records.</p>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="animate-pulse space-y-4">
             <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-xl" />
             <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-xl" />
          </div>
        ) : history.length === 0 ? (
          <div className="py-12 text-center text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-xl">
            You don't have any past medical history on record.
          </div>
        ) : (
          <div className="space-y-6">
            {history.map(record => (
              <div key={record.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-white dark:bg-slate-800 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex gap-4">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl border border-emerald-500/20 h-fit">
                      <Activity className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                        {(record.Doctor?.name || '').startsWith('Dr.') ? record.Doctor?.name : `Dr. ${record.Doctor?.name || 'Unknown Specialist'}`}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium">{record.Doctor?.specialization || 'General Consultation'}</p>
                      
                      <div className="flex items-center gap-4 mt-3 text-sm text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-slate-400" /> {record.date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400" /> {record.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                    record.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' :
                    record.status === 'Cancelled' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {record.status} Visit
                  </span>
                </div>
                
                {record.Prescriptions && record.Prescriptions.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700/50">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                      <FileText size={16} className="text-indigo-500" /> Prescribed Medication
                    </h4>
                    <div className="space-y-3">
                      {record.Prescriptions.map(pres => (
                        <div key={pres.id} className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-100 dark:border-slate-700/50">
                          <p className="font-medium text-slate-800 dark:text-slate-200">{pres.medication}</p>
                          <p className="text-sm text-slate-500 mt-1">Diagnosis: {pres.disease || 'General'}</p>
                          {pres.instructions && <p className="text-xs text-slate-400 mt-2 bg-slate-200/50 dark:bg-slate-800 p-2 rounded">Instructions: {pres.instructions}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
