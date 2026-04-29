import { useState } from 'react';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import RoleSelect from './RoleSelect';

export default function LoginForm({ onSubmit, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) next.email = 'Enter a valid email';
    if (!password) next.password = 'Password required';
    if (!role) next.role = 'Select a role';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit?.({ email, password, role });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <div className="flex items-center gap-3 text-xs">
            <Link className="text-blue-600 hover:underline" to="/forgot-password">
              Forgot password?
            </Link>
          </div>
        </div>
        <div className="relative">
          <input
            type={showPass ? 'text' : 'password'}
            placeholder="••••••••"
            className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

      <RoleSelect value={role} onChange={setRole} error={errors.role} />

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-3 font-semibold shadow-lg shadow-blue-600/30 hover:translate-y-[-1px] transition-all disabled:opacity-60"
      >
        {loading ? 'Signing in…' : 'Sign in'}
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
