import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { UserPlus, Trash2, Mail, Phone, Stethoscope, X, Check, AlertCircle, Loader2 } from 'lucide-react';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    specialization: '',
    experience: '',
    qualification: '',
    consultation_fees: ''
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data } = await api.get('/admin/doctors');
      setDoctors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      await api.post('/admin/doctors', formData);
      setSuccess('Doctor added successfully!');
      setFormData({
        name: '', email: '', password: '', phone: '',
        specialization: '', experience: '', qualification: '', consultation_fees: ''
      });
      setTimeout(() => {
        setShowModal(false);
        setSuccess('');
        fetchDoctors();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add doctor');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this doctor? This action cannot be undone.')) return;
    try {
      await api.delete(`/admin/doctors/${id}`);
      setDoctors(doctors.filter(doc => doc.id !== id));
    } catch (err) {
      alert('Failed to delete doctor');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-6 border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight dark:text-white bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Manage Doctors</h1>
          <p className="text-slate-500 text-sm mt-1">Directory and administration of all registered medical professionals.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all group lg:hover:-translate-y-1"
        >
          <UserPlus size={20} className="group-hover:rotate-12 transition-transform" /> 
          Add New Doctor
        </button>
      </div>

      <div className="card-container overflow-hidden">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : doctors.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <Stethoscope size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No doctors found</h3>
            <p className="text-slate-500 mt-1">Start by adding your first medical professional.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <th className="py-4 px-6 font-bold text-xs uppercase tracking-widest text-slate-500">Doctor Info</th>
                  <th className="py-4 px-6 font-bold text-xs uppercase tracking-widest text-slate-500">Specialization</th>
                  <th className="py-4 px-6 font-bold text-xs uppercase tracking-widest text-slate-500">Contact Details</th>
                  <th className="py-4 px-6 font-bold text-xs uppercase tracking-widest text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {doctors.map(doc => (
                  <tr key={doc.id} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all">
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 ring-4 ring-white dark:ring-slate-800">
                          <Stethoscope size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{doc.name}</p>
                          <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">{doc.qualification}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 w-fit capitalize">
                          {doc.specialization}
                        </span>
                        <span className="text-xs text-slate-500 px-1">{doc.experience} Years Experience</span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Mail size={14} className="text-blue-500" />
                          <span>{doc.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Phone size={14} className="text-indigo-500" />
                          <span>{doc.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-right">
                      <button 
                        onClick={() => handleDelete(doc.id)}
                        className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- ADD DOCTOR MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
              <h3 className="text-xl font-bold dark:text-white flex items-center gap-3">
                <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20">
                  <UserPlus size={20} />
                </div>
                Onboard New Doctor
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleAddDoctor} className="p-8 space-y-6">
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-medium animate-shake">
                  <AlertCircle size={18} /> {error}
                </div>
              )}

              {success && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                  <Check size={18} /> {success}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Full Name" name="name" value={formData.name} onChange={handleInputChange} required />
                <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                <InputField label="Secure Password" name="password" type="password" value={formData.password} onChange={handleInputChange} required />
                <InputField label="Mobile Number" name="phone" value={formData.phone} onChange={handleInputChange} required />
                <InputField label="Specialization" name="specialization" placeholder="e.g. Cardiology" value={formData.specialization} onChange={handleInputChange} required />
                <InputField label="Qualification" name="qualification" placeholder="e.g. MBBS, MD" value={formData.qualification} onChange={handleInputChange} required />
                <InputField label="Experience (Years)" name="experience" type="number" value={formData.experience} onChange={handleInputChange} required />
                <InputField label="Consultation Fees (₹)" name="consultation_fees" type="number" value={formData.consultation_fees} onChange={handleInputChange} required />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="px-8 py-2.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="animate-spin w-4 h-4" /> : <Check size={18} />}
                  {submitting ? 'Onboarding...' : 'Register Doctor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, ...props }) => (
  <div className="space-y-2 group">
    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 group-focus-within:text-blue-600 transition-colors px-1">{label}</label>
    <input 
      {...props}
      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-400 transition-all dark:text-white font-medium"
    />
  </div>
);

export default ManageDoctors;
