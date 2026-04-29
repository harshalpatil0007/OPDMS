import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Pencil, Check, X } from 'lucide-react';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchMe();
  }, []);

  const fetchMe = async () => {
    try {
      const { data } = await api.get('/auth/me');
      setMe(data);
      if (data.role === 'patient') {
        setFormData({
          name: data.name,
          phone: data.phone,
          age: data.patientProfile.age,
          gender: data.patientProfile.gender,
          address: data.patientProfile.address,
          medical_history: data.patientProfile.medical_history
        });
      } else if (data.role === 'doctor') {
         setFormData({
          name: data.name,
          phone: data.phone,
          specialization: data.doctorProfile.specialization,
          experience: data.doctorProfile.experience,
          qualification: data.doctorProfile.qualification,
          consultation_fees: data.doctorProfile.consultation_fees
        });
      } else {
        setFormData({ name: data.name, phone: data.phone });
      }
    } catch (err) {
      setStatus('Unable to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus('');
    try {
      await api.put('/auth/profile', formData);
      await fetchMe();
      setIsEditing(false);
      setStatus('Profile updated successfully!');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
       setStatus('Failed to update profile: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (loading) return <div className="p-8 text-slate-500">Loading profile…</div>;
  if (!me) return <div className="p-8 text-red-500">{status || 'No profile data'}</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="border-b pb-4 border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Profile</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your account information</p>
        </div>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition">
            <Pencil className="w-4 h-4" /> Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={() => { setIsEditing(false); setStatus(''); }} className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition disabled:opacity-50" disabled={saving}>
              <X className="w-4 h-4" /> Cancel
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition disabled:opacity-50" disabled={saving}>
              <Check className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      {status && (
        <div className={`p-4 rounded-lg text-sm ${status.includes('Failed') || status.includes('Unable') ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
          {status}
        </div>
      )}

      <div className="card p-6 shadow border border-slate-200 dark:border-slate-800 space-y-6">
        
        {/* Core Info */}
        <div>
           <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">Basic Details</h3>
           <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Email" value={me.email} /> {/* Email non-editable for now as it's a unique identifier */}
              <Field label="Role" value={me.role} />
              <EditableField label="Full Name" name="name" value={me.name} isEditing={isEditing} formData={formData} onChange={handleChange} />
              <EditableField label="Mobile No." name="phone" value={me.phone} isEditing={isEditing} formData={formData} onChange={handleChange} />
           </div>
        </div>

        {/* Patient Info */}
        {me.role === 'patient' && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">Patient Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <EditableField label="Age" name="age" type="number" value={me.patientProfile.age} isEditing={isEditing} formData={formData} onChange={handleChange} />
              <EditableField label="Gender" name="gender" type="select" options={['male', 'female', 'other']} value={me.patientProfile.gender} isEditing={isEditing} formData={formData} onChange={handleChange} />
              <EditableField label="Address" name="address" type="textarea" value={me.patientProfile.address} isEditing={isEditing} formData={formData} onChange={handleChange} className="sm:col-span-2" />
              <EditableField label="Medical History" name="medical_history" type="textarea" value={me.patientProfile.medical_history} isEditing={isEditing} formData={formData} onChange={handleChange} className="sm:col-span-2" />
            </div>
          </div>
        )}

        {/* Doctor Info */}
        {me.role === 'doctor' && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">Doctor Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <EditableField label="Specialization" name="specialization" value={me.doctorProfile.specialization} isEditing={isEditing} formData={formData} onChange={handleChange} />
              <EditableField label="Qualification" name="qualification" value={me.doctorProfile.qualification} isEditing={isEditing} formData={formData} onChange={handleChange} />
              <EditableField label="Experience (Years)" name="experience" type="number" value={me.doctorProfile.experience} isEditing={isEditing} formData={formData} onChange={handleChange} />
              <EditableField label="Consultation Fees (₹)" name="consultation_fees" type="number" value={me.doctorProfile.consultation_fees} isEditing={isEditing} formData={formData} onChange={handleChange} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate mt-1">{value || '—'}</p>
    </div>
  );
}

function EditableField({ label, name, type = 'text', value, isEditing, formData, onChange, options = [], className = '' }) {
  if (!isEditing) {
    return <Field label={label} value={value} />;
  }

  return (
    <div className={`rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10 px-4 py-3 ${className}`}>
      <label className="text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400 font-semibold block mb-2">{label}</label>
      
      {type === 'textarea' ? (
        <textarea 
          name={name}
          value={formData[name] || ''}
          onChange={onChange}
          rows={3}
          className="w-full text-sm rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : type === 'select' ? (
        <select 
          name={name}
          value={formData[name] || ''}
          onChange={onChange}
          className="w-full text-sm rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
        >
          <option value="">Select...</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input 
          type={type}
          name={name}
          value={formData[name] || ''}
          onChange={onChange}
          className="w-full text-sm rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
}
