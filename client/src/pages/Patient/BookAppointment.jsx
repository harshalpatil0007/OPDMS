import { useState, useEffect, useMemo } from 'react';
import api from '../../utils/api';
import { Calendar, Clock, UserIcon, CheckCircle2, Search, Stethoscope, ChevronRight, X, Activity, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const slots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ doctorId: '', date: '', time: '', reason: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data } = await api.get('/public/doctors');
      setDoctors(data);
      if (data.length > 0) setFormData((f) => ({ ...f, doctorId: data[0].id }));
    } catch (err) {
      console.error(err);
      setStatus('Unable to load doctors right now.');
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => 
      doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [doctors, searchTerm]);

  const selectedDoctor = useMemo(
    () => doctors.find((d) => String(d.id) === String(formData.doctorId)),
    [doctors, formData.doctorId],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      if (!formData.doctorId || !formData.date || !formData.time) {
         setStatus('Please select a doctor, date and time.');
         return;
      }
      await api.post('/appointments/book', formData);
      setStatus('Appointment booked successfully!');
      setTimeout(() => navigate('/patient/history'), 1500);
    } catch (err) {
      setStatus(err.response?.data?.error || err.response?.data?.message || 'Failed to book appointment');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight dark:text-white bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Book Appointment</h1>
          <p className="text-slate-500 text-sm mt-1">Schedule a consultation with our experienced medical professionals.</p>
        </div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-12 gap-8" onSubmit={handleSubmit}>
        
        <div className="lg:col-span-8 space-y-6">
          <div className="card p-6 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl">
             <div className="flex items-center justify-between mb-6">
                <label className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Stethoscope size={20} className="text-blue-500" /> Choose Your Specialist
                </label>
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                   <input 
                      type="text" 
                      placeholder="Search name or specialty..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 text-sm w-48 sm:w-64 transition-all"
                   />
                </div>
             </div>

             {loading ? (
                <div className="grid sm:grid-cols-2 gap-4">
                   {[1,2,3,4].map(i => <div key={i} className="h-28 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl" />)}
                </div>
             ) : (
                <div className="grid sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredDoctors.map((doc) => (
                    <button
                      type="button"
                      key={doc.id}
                      onClick={() => setFormData({ ...formData, doctorId: doc.id })}
                      className={`group relative text-left rounded-2xl border-2 p-5 transition-all duration-300 ${
                        String(formData.doctorId) === String(doc.id)
                          ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 shadow-lg shadow-blue-500/10'
                          : 'border-slate-100 dark:border-slate-800 hover:border-blue-200 bg-white dark:bg-slate-900 shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                          <UserIcon size={20} />
                        </div>
                        {String(formData.doctorId) === String(doc.id) && (
                          <CheckCircle2 size={20} className="text-blue-500" />
                        )}
                      </div>
                      <p className="font-bold text-slate-900 dark:text-white text-lg">{(doc?.name || '').startsWith('Dr.') ? doc.name : `Dr. ${doc?.name || 'Specialist'}`}</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                        <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{doc.specialization}</p>
                        <span className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block" />
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                           <Phone size={10} className="text-slate-400" /> {doc.phone || 'Contact not listed'}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-bold text-slate-500">₹{doc.consultation_fees} Fee</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-xs font-bold text-slate-500">{doc.experience} Years Exp.</span>
                      </div>
                    </button>
                  ))}
                  {filteredDoctors.length === 0 && (
                    <div className="col-span-full py-10 text-center text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
                      No matching doctors found.
                    </div>
                  )}
                </div>
             )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             <div className="card p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                  <Calendar size={16} className="text-indigo-500" /> Pick a Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all dark:text-white font-medium"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
             </div>

             <div className="card p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                  <Clock size={16} className="text-amber-500" /> Select Time
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {slots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setFormData({ ...formData, time: slot })}
                      className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${
                        formData.time === slot
                          ? 'border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                          : 'border-slate-100 dark:border-slate-800 hover:border-blue-300 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
             </div>

             <div className="card p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 col-span-full">
                <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                  <Activity size={16} className="text-emerald-500" /> Reason for Visit (Optional)
                </label>
                <textarea 
                  placeholder="Tell us briefly about your symptoms or purpose of visit..." 
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all dark:text-white font-medium resize-none"
                  rows={2}
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                />
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="card p-0 border-none bg-gradient-to-br from-blue-600 to-indigo-700 text-white overflow-hidden shadow-2xl shadow-blue-500/20 sticky top-8">
              <div className="p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  Booking Summary
                </h3>
                
                <div className="space-y-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                   {selectedDoctor ? (
                     <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                           <Stethoscope size={24} />
                        </div>
                        <div>
                           <p className="text-xs text-blue-100 font-bold uppercase tracking-tighter">Selected Doctor</p>
                           <p className="font-bold text-lg leading-tight">{(selectedDoctor?.name || '').startsWith('Dr.') ? selectedDoctor.name : `Dr. ${selectedDoctor?.name || 'Specialist'}`}</p>
                           <p className="text-sm text-blue-200 mt-1">{selectedDoctor.specialization}</p>
                        </div>
                     </div>
                   ) : (
                     <p className="text-sm text-blue-200">No specialist selected</p>
                   )}

                   <div className="flex justify-between items-center py-4 border-y border-white/10">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Appointment Fee</p>
                        <p className="text-2xl font-black mt-1">₹{selectedDoctor?.consultation_fees || '0.00'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Schedule</p>
                        <p className="text-sm font-bold mt-1">{formData.date || 'TBD'}</p>
                        <p className="text-sm font-bold">{formData.time || 'TBD'}</p>
                      </div>
                   </div>

                   <button
                      type="submit"
                      disabled={!formData.doctorId || !formData.date || !formData.time}
                      className="w-full bg-white text-blue-700 hover:bg-blue-50 py-4 px-6 rounded-2xl font-black tracking-widest uppercase transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 flex items-center justify-center gap-2 group"
                   >
                     Confirm & Book <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>

                <div className="mt-8 flex items-center gap-3 text-[10px] font-bold text-blue-200/80 uppercase tracking-[0.2em] justify-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse" /> Secure Checkout
                </div>
              </div>
           </div>

           {status && (
              <div className={`p-4 rounded-2xl font-bold text-sm flex items-center gap-3 animate-in slide-in-from-right-4 duration-500 ${
                status.includes('successfully') 
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                : 'bg-red-50 text-red-600 border border-red-100'
              }`}>
                {status.includes('successfully') ? <CheckCircle2 size={18} /> : <X size={18} />}
                {status}
              </div>
           )}
        </div>
      </form>
    </div>
  );
};

export default BookAppointment;
