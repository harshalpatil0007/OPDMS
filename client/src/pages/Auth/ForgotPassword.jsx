import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { ShieldAlert, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match.');
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const res = await api.post('/auth/reset-password', { email, newPassword });
      setSuccess(res.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-[#020617] dark:via-[#050c22] dark:to-[#0b1a3a] px-4 py-10 text-slate-900 dark:text-slate-50">
      <div className="max-w-md w-full bg-white dark:bg-slate-900/95 dark:backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-200 dark:border-white/10">
        
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-amber-100 dark:bg-amber-500/20 p-3 rounded-2xl border border-amber-200 dark:border-amber-500/30">
            <ShieldAlert className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Reset Password</h2>
          </div>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
          Enter your registered email address and provide your new password to restore access to your account.
        </p>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 px-4 py-3 rounded-xl text-sm mb-6">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 px-4 py-3 rounded-xl text-sm mb-6">
            {success} Redirecting to login...
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
            <div className="relative">
              <input
                type={showPass1 ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPass1(!showPass1)}
                className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
              >
                {showPass1 ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Confirm New Password</label>
            <div className="relative">
              <input
                type={showPass2 ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPass2(!showPass2)}
                className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
              >
                {showPass2 ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 text-white py-3 mt-2 font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? 'Processing…' : 'Change password'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition">
            <ArrowLeft size={16} /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
