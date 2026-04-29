import PublicNavbar from '../components/Layout/PublicNavbar';
import { ShieldCheck, Cross, HeartPulse, Activity } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] font-sans">
      <PublicNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
            Revolutionizing Healthcare with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Aurora</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Aurora HMS is a comprehensive, SaaS-based platform that intelligently enhances your operations. Built by a team of visionary technologists and medical professionals, we strive to bring unmatched digital workflow automation securely and affordably.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative p-2 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 order-2 md:order-1">
            <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Hospital Team" className="rounded-xl shadow-2xl" />
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Our Mission</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              We aim to eliminate the friction in healthcare delivery by offering hospitals, clinics, and solo practitioners a state-of-the-art Electronic Medical Record (EMR) and Hospital Management System (HMS).
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              With integrated queue management, secure billing, and modern telemedicine endpoints, our platform empowers doctors to do what they do best: focus precisely on patient care rather than administrative overhead.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 text-center">
            <div className="w-14 h-14 mx-auto bg-blue-100 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Secure</h3>
            <p className="text-slate-500 dark:text-slate-400">Top-tier data encryption and HIPAA-compliant architecture.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 text-center">
            <div className="w-14 h-14 mx-auto bg-emerald-100 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
              <HeartPulse className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Empathetic</h3>
            <p className="text-slate-500 dark:text-slate-400">Designed with patients' and practitioners' well-being in mind.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 text-center">
            <div className="w-14 h-14 mx-auto bg-purple-100 dark:bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
              <Activity className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Fast</h3>
            <p className="text-slate-500 dark:text-slate-400">Lightning fast records, minimizing load time essentially to zero.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 text-center">
            <div className="w-14 h-14 mx-auto bg-rose-100 dark:bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6 text-rose-600 dark:text-rose-400">
              <Cross className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Reliable</h3>
            <p className="text-slate-500 dark:text-slate-400">Automated backups and 99.99% uptime guarantees for all portals.</p>
          </div>
        </div>
      </main>

    </div>
  );
}
