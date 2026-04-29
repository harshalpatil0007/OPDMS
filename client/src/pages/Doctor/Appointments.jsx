import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Calendar, UserCircle, Activity, Clock, CheckCircle, XCircle, FileText, Pill, X, Loader2, Clipboard, Info, Phone, MapPin, User, Mail } from 'lucide-react';
import { useSelector } from 'react-redux';

const Appointments = () => {
  const { user } = useSelector(state => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Prescription Mock State
  const [showPrescribe, setShowPrescribe] = useState(null); // stores appointment ID
  const [showPatientDetail, setShowPatientDetail] = useState(null); // stores patient object
  const [submitting, setSubmitting] = useState(false);
  const [presData, setPresData] = useState({ disease: '', medication: '', instructions: '' });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await api.get('/appointments');
      setAppointments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/appointments/${id}`, { status });
      fetchAppointments();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handlePrescribe = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/appointments/prescription', {
        appointmentId: showPrescribe,
        ...presData
      });
      setShowPrescribe(null);
      setPresData({ disease: '', medication: '', instructions: '' });
      fetchAppointments();
    } catch (err) {
      alert('Failed to save prescription');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b pb-6 border-slate-200 dark:border-slate-800 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight dark:text-white bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Prescription Pipeline</h1>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
            Managing your clinical workload, {(user?.name || '').startsWith('Dr.') ? user?.name : `Dr. ${user?.name || 'Doctor'}`}
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-2xl border border-blue-100 dark:border-blue-800 h-fit">
           <Calendar className="text-blue-500 h-6 w-6" />
        </div>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1,2,3].map(i => <div key={i} className="h-28 bg-slate-100 dark:bg-slate-800 rounded-3xl" />)}
          </div>
        ) : appointments.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            <Activity size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No appointments scheduled</h3>
            <p className="text-sm text-slate-400 mt-1">Your current pipeline is completely clear.</p>
          </div>
        ) : (
          appointments.map(apt => (
            <div key={apt.id} className="group relative bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-l-3xl" />
              <div className="flex gap-5 items-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors duration-300">
                  <UserCircle size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {apt.Patient?.name || 'Guest Patient'}
                  </h3>
                  <div className="text-xs font-bold text-slate-400 mt-1 flex flex-wrap gap-4 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Calendar size={12} className="text-slate-500" /> {apt.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} className="text-slate-500" /> {apt.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0 items-center justify-end w-full md:w-auto">
                <button 
                  onClick={() => setShowPatientDetail(apt.Patient)}
                  className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-2 group/btn"
                >
                  <Info size={16} className="group-hover/btn:scale-110 transition-transform" />
                  View Details
                </button>

                <div className="mt-6 md:mt-0 flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 dark:border-slate-800">
                  <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.1em] ${
                    apt.status === 'Completed' ? 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    apt.status === 'Cancelled' ? 'bg-red-100/80 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-blue-100/80 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                    <Activity size={12} /> {apt.status}
                  </span>

                  {apt.status === 'Scheduled' && (
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button 
                        onClick={() => setShowPrescribe(apt.id)} 
                        className="group/btn flex items-center justify-center gap-2 flex-1 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                      >
                        <FileText size={14} className="group-hover/btn:scale-110 transition-transform" /> Prescribe
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(apt.id, 'Cancelled')} 
                        className="group/btn flex items-center justify-center gap-2 flex-1 px-5 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-900/50 rounded-2xl text-xs font-bold transition-all active:scale-95"
                      >
                        <XCircle size={14} className="group-hover/btn:scale-110 transition-transform" /> Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Patient Detail Modal */}
      {showPatientDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[6px] animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-[2.5rem] shadow-2xl border border-white dark:border-slate-800 overflow-hidden relative animate-in zoom-in-95 duration-300">
              <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
                 <button onClick={() => setShowPatientDetail(null)} className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors backdrop-blur-md">
                    <X size={20} />
                 </button>
              </div>
              <div className="px-10 pb-10 -mt-10">
                 <div className="flex items-end gap-6 mb-8">
                    <div className="w-24 h-24 rounded-[2rem] bg-white dark:bg-slate-800 p-1.5 shadow-xl">
                       <div className="w-full h-full rounded-[1.7rem] bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                          <UserCircle size={48} />
                       </div>
                    </div>
                    <div className="mb-2">
                       <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{showPatientDetail.name}</h2>
                       <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] mt-1 italic">Patient ID: #{showPatientDetail.id.toString().padStart(4, '0')}</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-4">
                       <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                          <User size={18} className="text-blue-500 shrink-0" />
                          <div>
                             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Demographics</p>
                             <p className="font-bold">{showPatientDetail.age} Years • {showPatientDetail.gender.charAt(0).toUpperCase() + showPatientDetail.gender.slice(1)}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                          <Phone size={18} className="text-emerald-500 shrink-0" />
                          <div>
                             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Contact</p>
                             <p className="font-bold">{showPatientDetail.phone || 'N/A'}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                          <Mail size={18} className="text-amber-500 shrink-0" />
                          <div>
                             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Address</p>
                             <p className="font-bold truncate max-w-[180px]">{showPatientDetail.email}</p>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                          <MapPin size={18} className="text-rose-500 shrink-0 mt-1" />
                          <div>
                             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Address</p>
                             <p className="font-bold text-sm leading-relaxed">{showPatientDetail.address || 'No address provided'}</p>
                          </div>
                       </div>
                       <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                          <FileText size={18} className="text-indigo-500 shrink-0 mt-1" />
                          <div>
                             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Medical History</p>
                             <p className="font-bold text-sm leading-relaxed italic line-clamp-3">"{showPatientDetail.medical_history || 'No history recorded'}"</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <button 
                  onClick={() => {
                    const apt = appointments.find(a => a.patientId === showPatientDetail.id);
                    if (apt) { setShowPrescribe(apt.id); setShowPatientDetail(null); }
                  }}
                  className="w-full mt-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                 >
                    Action Clinical Case
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* --- PRESCRIBE MODAL --- */}
      {showPrescribe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-500">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                <h3 className="text-xl font-bold dark:text-white flex items-center gap-3">
                  <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg">
                    <Clipboard size={20} />
                  </div>
                  Issue Prescription
                </h3>
                <button onClick={() => setShowPrescribe(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
             </div>
             
             <form onSubmit={handlePrescribe} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                          <Activity size={14} className="text-rose-500" /> Initial Diagnosis
                       </label>
                       <input
                          type="text"
                          required
                          placeholder="e.g., Acute Viral Fever"
                          className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-blue-500 outline-none transition-all dark:text-white font-bold text-sm"
                          value={presData.disease}
                          onChange={(e) => setPresData({...presData, disease: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                          <Pill size={14} className="text-blue-500" /> Medication List
                       </label>
                       <input
                          type="text"
                          required
                          placeholder="e.g., Paracetamol 500mg, Vitamins"
                          className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-blue-500 outline-none transition-all dark:text-white font-bold text-sm"
                          value={presData.medication}
                          onChange={(e) => setPresData({...presData, medication: e.target.value})}
                       />
                    </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <FileText size={14} className="text-amber-500" /> Intake Instructions
                   </label>
                   <textarea
                      required
                      rows={4}
                      placeholder="Specify dosage frequency, food requirements, and follow-up steps..."
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-blue-500 outline-none transition-all dark:text-white font-bold text-sm resize-none"
                      value={presData.instructions}
                      onChange={(e) => setPresData({...presData, instructions: e.target.value})}
                   />
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                   <button
                      type="button"
                      onClick={() => setShowPrescribe(null)}
                      className="flex-1 py-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
                   >
                      Discard
                   </button>
                   <button
                      type="submit"
                      disabled={submitting}
                      className="flex-[2] py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                   >
                      {submitting ? <Loader2 className="animate-spin" size={18} /> : (
                         <>
                            <CheckCircle size={18} /> Confirm Prescription
                         </>
                      )}
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Appointments;
