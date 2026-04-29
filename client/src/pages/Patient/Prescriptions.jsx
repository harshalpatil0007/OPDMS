import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Pill, Calendar, User, FileText, Download, Search, AlertCircle, Clock } from 'lucide-react';

const Prescriptions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const { data } = await api.get('/appointments/history/me');
      // Only keep ones with prescriptions
      const filtered = data.filter(apt => apt.Prescription);
      setData(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPrescriptions = data.filter(item => 
    item.Prescription.medication?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Prescription.disease?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6 border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight dark:text-white bg-gradient-to-r from-teal-500 to-emerald-600 bg-clip-text text-transparent">Digital Prescriptions</h1>
          <p className="text-slate-500 text-sm mt-1">Access and manage all medications prescribed by your specialists.</p>
        </div>
        <div className="relative w-full sm:w-72">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
           <input 
              type="text" 
              placeholder="Search medication or doctor..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all dark:text-white text-sm font-medium"
           />
        </div>
      </div>

      <div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map(i => <div key={i} className="h-56 bg-white dark:bg-slate-800 animate-pulse rounded-3xl" />)}
          </div>
        ) : filteredPrescriptions.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-slate-800 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
            <Pill size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No prescriptions found</h3>
            <p className="text-sm text-slate-400 mt-1">
               {searchTerm ? "No matching medications found." : "You don't have any prescriptions on file yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPrescriptions.map(item => (
              <div key={item.id} className="group bg-white dark:bg-slate-900/60 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 -mr-12 -mt-12 rounded-full group-hover:scale-150 transition-transform duration-700" />
                
                <div className="flex justify-between items-start mb-6">
                   <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 dark:text-teal-400 shadow-inner group-hover:scale-110 transition-transform">
                         <Pill size={28} />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-teal-600 uppercase tracking-widest leading-none mb-1">Medication List</p>
                         <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">{item.Prescription.medication}</h3>
                         <div className="flex items-center gap-2 mt-2 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                            <Clock size={12} className="text-slate-500" /> {item.date} Visit
                         </div>
                      </div>
                   </div>
                   <button className="p-3 text-slate-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-2xl transition-all" title="Download E-Prescription">
                      <Download size={20} />
                   </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Prescribed By</p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{(item.Doctor?.name || '').startsWith('Dr.') ? item.Doctor?.name : `Dr. ${item.Doctor?.name || 'Specialist'}`}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{item.Doctor?.specialization}</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Diagnosis</p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{item.Prescription.disease || 'Initial Consultation'}</p>
                   </div>
                </div>

                <div className="mt-6">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                      <FileText size={12} className="text-teal-500" /> Intake Instructions
                   </p>
                   <div className="p-4 bg-teal-50/50 dark:bg-emerald-900/10 rounded-2xl border border-teal-100 dark:border-teal-900/10">
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                         "{item.Prescription.instructions || 'Continue basic symptomatic treatment and follow up if symptoms persist.'}"
                      </p>
                   </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center px-1">
                   <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50 animate-pulse" /> Valid Prescription
                   </div>
                   <span className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">Aurora HMS System Verified</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Prescriptions;
