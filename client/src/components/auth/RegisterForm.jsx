import { useState } from 'react';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import RoleSelect from './RoleSelect';

export default function RegisterForm({ onSubmit, loading }) {
  const [form, setForm] = useState({ 
    name: '', email: '', password: '', role: 'patient', phone: '',
    age: '', gender: 'other', address: '', medical_history: '',
    specialization: '', experience: '', qualification: '', consultation_fees: ''
  });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const validate = () => {
    const next = {};
    if (!form.name) next.name = 'Name required';
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) next.email = 'Enter a valid email';
    if (!form.password) next.password = 'Password required';
    if (form.role !== 'admin' && !form.phone) next.phone = 'Mobile No. required';
    if (!form.role) next.role = 'Select a role';

    if (form.role === 'patient') {
      if (!form.age) next.age = 'Age required';
      if (!form.address) next.address = 'Address required';
    }

    if (form.role === 'doctor') {
      if (!form.specialization) next.specialization = 'Specialization required';
      if (!form.qualification) next.qualification = 'Qualification required';
      if (!form.consultation_fees) next.consultation_fees = 'Fees required';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit?.(form);
  };

  return (
    <form className="space-y-4 max-h-[70vh] overflow-y-auto px-1" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Full name</label>
          <input
            type="text"
            placeholder="Ayesha Singh"
            className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
            required
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            required
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••"
              className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={form.password}
              onChange={(e) => setField('password', e.target.value)}
              required
            />
            <button 
              type="button" 
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 transition"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Mobile No.</label>
          <input
            type="tel"
            placeholder="+91 8390906700"
            className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={form.phone}
            onChange={(e) => setField('phone', e.target.value)}
            required
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <RoleSelect value={form.role} onChange={(v) => setField('role', v)} error={errors.role} />

      {/* Role Specific Fields */}
      {form.role === 'patient' && (
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Age</label>
              <input
                type="number"
                placeholder="25"
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={form.age}
                onChange={(e) => setField('age', e.target.value)}
              />
              {errors.age && <p className="text-xs text-red-500">{errors.age}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Gender</label>
              <select
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={form.gender}
                onChange={(e) => setField('gender', e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Address</label>
            <input
              type="text"
              placeholder="Street, City, State"
              className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={form.address}
              onChange={(e) => setField('address', e.target.value)}
            />
            {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Medical History (Optional)</label>
            <textarea
              placeholder="Any past illnesses or allergies..."
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[80px]"
              value={form.medical_history}
              onChange={(e) => setField('medical_history', e.target.value)}
            />
          </div>
        </div>
      )}

      {form.role === 'doctor' && (
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Specialization</label>
              <input
                type="text"
                placeholder="e.g. Cardiology"
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={form.specialization}
                onChange={(e) => setField('specialization', e.target.value)}
              />
              {errors.specialization && <p className="text-xs text-red-500">{errors.specialization}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Experience (Years)</label>
              <input
                type="number"
                placeholder="5"
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={form.experience}
                onChange={(e) => setField('experience', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Qualification</label>
              <input
                type="text"
                placeholder="e.g. MBBS, MD"
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={form.qualification}
                onChange={(e) => setField('qualification', e.target.value)}
              />
              {errors.qualification && <p className="text-xs text-red-500">{errors.qualification}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Consultation Fees (₹)</label>
              <input
                type="number"
                placeholder="500"
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={form.consultation_fees}
                onChange={(e) => setField('consultation_fees', e.target.value)}
              />
              {errors.consultation_fees && <p className="text-xs text-red-500">{errors.consultation_fees}</p>}
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 text-white py-3 font-semibold shadow-lg shadow-emerald-500/30 hover:translate-y-[-1px] transition-all disabled:opacity-60"
      >
        {loading ? 'Creating…' : 'Create account'}
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
