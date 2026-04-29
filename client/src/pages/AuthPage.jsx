import { useState } from 'react';
import { Stethoscope, ShieldCheck } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

export default function AuthPage({ initialMode = 'login', onLogin, onRegister, loading = false, error = '' }) {
  const [mode, setMode] = useState(initialMode);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#050c22] to-[#0b1a3a] px-4 py-10 text-slate-50">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* LEFT PANEL */}
        <div className="relative">
          <div className="absolute -z-10 inset-0 blur-3xl bg-gradient-to-br from-blue-600/30 via-cyan-400/25 to-emerald-400/25" />
          <div className="relative rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl p-10 lg:p-12 overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.35),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.35),transparent_30%)]" />
            <div className="relative flex items-center gap-3 text-white mb-6">
              <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
                <Stethoscope className="h-10 w-10 text-cyan-300" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Aurora HMS</p>
                <h2 className="text-3xl font-bold">Care that feels modern</h2>
              </div>
            </div>
            <p className="relative text-slate-100/90 text-lg leading-relaxed">
              Manage appointments, prescriptions, and patient journeys with a clean, responsive experience. Built for admins,
              doctors, and patients to collaborate seamlessly.
            </p>
            <div className="relative mt-10 flex items-center gap-3 text-sm text-cyan-100">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
              <span>Secure access • JWT • Role-based control</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="relative">
          <div className="bg-white/95 text-slate-900 rounded-3xl shadow-2xl p-8 sm:p-10 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Aurora HMS</p>
                <h1 className="text-2xl font-bold">{mode === 'login' ? 'Sign in' : 'Create account'}</h1>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 border border-red-200 px-4 py-3 rounded-xl text-sm mb-4">
                {error}
              </div>
            )}

            {mode === 'login' ? (
              <>
                <LoginForm loading={loading} onSubmit={onLogin} />
                <p className="mt-6 text-sm text-center text-slate-600">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    className="font-semibold text-blue-600 hover:underline"
                    onClick={() => setMode('register')}
                  >
                    Register
                  </button>
                </p>
              </>
            ) : (
              <>
                <RegisterForm loading={loading} onSubmit={onRegister} />
                <p className="mt-6 text-sm text-center text-slate-600">
                  Already registered?{' '}
                  <button
                    type="button"
                    className="font-semibold text-emerald-600 hover:underline"
                    onClick={() => setMode('login')}
                  >
                    Sign in
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
