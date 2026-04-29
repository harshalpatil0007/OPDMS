import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Mail, Phone, MapPin, UserIcon, Trash2, Loader2, Search, UserMinus } from 'lucide-react';

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const { data } = await api.get('/admin/patients');
      setPatients(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this patient record? This will delete all history.')) return;
    try {
      await api.delete(`/admin/patients/${id}`);
      setPatients(patients.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to remove patient.');
    }
  };

  const filteredPatients = patients.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-6 border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight dark:text-white bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Patient Registry</h1>
          <p className="text-slate-500 text-sm mt-1">Directory and management of all hospital patient records.</p>
        </div>
        <div className="relative w-full sm:w-64">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
           <input 
              type="text" 
              placeholder="Search patients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white text-sm"
           />
        </div>
      </div>

      <div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <UserMinus size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No patients matched</h3>
            <p className="text-slate-500 mt-1">Try searching for a different name or email.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPatients.map(patient => (
              <div key={patient.id} className="group relative bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-2xl ring-4 ring-emerald-50/50 dark:ring-emerald-900/10 transition-transform group-hover:rotate-6">
                    <UserIcon size={24} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate max-w-[150px]">{patient.name || 'Anonymous'}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{patient.age}Y • {patient.gender}</p>
                  </div>
                </div>
                
                <div className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <Mail size={14} className="text-emerald-500 shrink-0" />
                    <span className="truncate">{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <Phone size={14} className="text-teal-500 shrink-0" />
                    <span>{patient.phone || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin size={14} className="text-indigo-500 shrink-0" />
                    <span className="truncate">{patient.address || 'Remote'}</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center px-1">
                   <span className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">Registered</span>
                   <button 
                      onClick={() => handleDelete(patient.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                   >
                     <Trash2 size={18} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePatients;
