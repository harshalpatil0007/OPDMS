import { Link } from 'react-router-dom';
import PublicNavbar from '../components/Layout/PublicNavbar';
import { 
  Stethoscope, 
  CalendarCheck, 
  Users, 
  Activity, 
  FileText, 
  ShieldCheck, 
  MessageSquare, 
  BarChart, 
  ArrowRight,
  MonitorSmartphone,
  ChevronRight
} from 'lucide-react';

export default function Landing() {
  const features = [
    {
      title: 'Patient Registration',
      description: 'Experience a quick and detailed registration process to document patient information securely. Accessible anytime, anywhere.',
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-100 dark:bg-blue-500/10',
    },
    {
      title: 'Appointment Booking',
      description: 'Booking an appointment has never been so easy. One screen to create, view, and manage appointments with instant scheduling.',
      icon: CalendarCheck,
      color: 'text-emerald-500',
      bg: 'bg-emerald-100 dark:bg-emerald-500/10',
    },
    {
      title: 'Queue Management',
      description: 'Leverage token management to effectively organize long waiting lines with real-time screencast and notifications.',
      icon: MonitorSmartphone,
      color: 'text-purple-500',
      bg: 'bg-purple-100 dark:bg-purple-500/10',
    },
    {
      title: 'Electronic Health Records',
      description: 'Maintain primary care data securely with an intuitive user interface. Multi-lingual prescriptions and instant documentation.',
      icon: FileText,
      color: 'text-amber-500',
      bg: 'bg-amber-100 dark:bg-amber-500/10',
    },
    {
      title: 'Role Based Access',
      description: 'Secure your data through strict Role-Based Access Management. Grant access cleanly by user roles for maximum privacy.',
      icon: ShieldCheck,
      color: 'text-rose-500',
      bg: 'bg-rose-100 dark:bg-rose-500/10',
    },
    {
      title: 'Reports & Analytics',
      description: 'Over 50+ outpatient-related reports available. Visualize your data through interactive charts for easy inferences.',
      icon: BarChart,
      color: 'text-cyan-500',
      bg: 'bg-cyan-100 dark:bg-cyan-500/10',
    },
    {
      title: 'Communication Management',
      description: 'Seamless communication via SMS, Email, and WhatsApp for better patient engagement and retention.',
      icon: MessageSquare,
      color: 'text-indigo-500',
      bg: 'bg-indigo-100 dark:bg-indigo-500/10',
    },
    {
      title: 'OP Billing',
      description: 'Add and manage unlimited services and costs. Automatically track all billable data for robust accounting.',
      icon: Activity,
      color: 'text-pink-500',
      bg: 'bg-pink-100 dark:bg-pink-500/10',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] font-sans selection:bg-blue-500/30">
      <PublicNavbar />

      {/* Hero Section */}
      <div className="relative isolate pt-6 dark:bg-[#050c22]">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-400 to-indigo-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>
        
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Left Text Div */}
              <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
                <div className="mb-8 flex justify-center lg:justify-start">
                  <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-slate-600 dark:text-slate-300 ring-1 ring-slate-900/10 dark:ring-white/10 hover:ring-slate-900/20 dark:hover:ring-white/20 transition">
                    Modern OPD Management Software.{' '}
                    <Link to="/register" className="font-semibold text-blue-600 dark:text-blue-400">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Try it now <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl mb-6">
                  Deliver meaningful primary care outcomes.
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0">
                  Securely centralize vital patient data from outpatient check-in to out. Aurora HMS transforms your clinical practice with coherent functionality and unparalleled patient satisfaction.
                </p>
                <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
                  <Link
                    to="/register"
                    className="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-all hover:-translate-y-1"
                  >
                    Get started
                  </Link>
                  <Link to="/login" className="text-sm font-semibold leading-6 text-slate-900 dark:text-white flex items-center gap-1 group">
                    Sign in <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Image Div */}
              <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                <img 
                  src="https://ezovion.com/wp-content/uploads/2024/06/Home-Page-Banner-New.gif.webp" 
                  alt="OPD Software Dashboard" 
                  className="w-full h-auto drop-shadow-2xl object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32 bg-white dark:bg-[#020617] relative z-10 border-t border-slate-100 dark:border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">Complete Hospital Suite</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Everything you need to manage your hospital
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
              Modernize your hospital business with robust OPD Management Software that transforms operations with a futuristic patient information system.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col bg-slate-50 dark:bg-white/5 p-8 rounded-3xl border border-slate-100 dark:border-white/10 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-slate-900 dark:text-white mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.bg}`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
                    </div>
                  </dt>
                  <dd className="flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-400">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative isolate overflow-hidden bg-slate-900 dark:bg-[#0b1a3a] py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Boost your clinical efficiency today.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Join leading healthcare providers who trust Aurora HMS for their patient and hospital management needs.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 transition-all hover:-translate-y-1"
              >
                Create free account
              </Link>
            </div>
          </div>
        </div>
        <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
          <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.3" />
          <defs>
            <radialGradient id="gradient">
              <stop stopColor="#3b82f6" />
              <stop offset={1} stopColor="#4f46e5" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-[#020617] mt-16">
        
        {/* Custom Upper Footer */}
        <div className="relative isolate overflow-hidden bg-white dark:bg-[#020617] py-16 text-slate-900 dark:text-white border-t border-slate-200 dark:border-white/10">
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            
            {/* Column 1: About Us */}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">About Us</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                <li><Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link></li>
                <li><Link to="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About Us</Link></li>
                <li><Link to="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Our Team (Doctors)</Link></li>
                <li><Link to="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact Us</Link></li>
              </ul>
            </div>

            {/* Column 2: Links */}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Links</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                <li><Link to="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Departments</Link></li>
                <li><Link to="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Our Facility's</Link></li>
                <li><Link to="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Our Services</Link></li>
                <li><Link to="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Our Empaneled TPAs</Link></li>
              </ul>
            </div>

            {/* Column 3: Links */}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Links</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                <li><Link to="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Photo Gallery</Link></li>
                <li><Link to="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Media News</Link></li>
                <li><Link to="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Career & Jobs</Link></li>
                <li><Link to="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Give Feedback</Link></li>
              </ul>
            </div>

            {/* Column 4: Address */}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Address:</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Plot No.271/272(P),<br/>
                Opp R.R High School,<br/>
                Jilha Peth, Jalgaon<br/>
                (Maharashtra) IN - 425001
              </p>
            </div>

            {/* Column 5: Subscribe */}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Subscribe</h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 20.25c0 .414.336.75.75.75h2.5c.414 0 .75-.336.75-.75V18h4.25c.414 0 .75-.336.75-.75V8.5L12 3 4 8.5v8.75c0 .414.336.75.75.75H9v2.25z"></path></svg>
                    <span>Emergency Helpline: <br/>(+91) 8390906700</span>
                </li>
                <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <span>(+91) 0257-2229749 / 2228969 / 70</span>
                </li>
                <li className="flex items-start gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                    <span>aurorahms@gmail.com</span>
                </li>
              </ul>
              
              {/* Social & Subscribe Buttons Row */}
              <div className="flex items-center gap-1 mt-4">
                <a href="#" className="p-2 bg-[#3b5998] hover:bg-[#2d4373] text-white transition flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="p-2 bg-[#00aced] hover:bg-[#0084b4] text-white transition flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="p-2 bg-[#dd4b39] hover:bg-[#c23321] text-white transition flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
                </a>
                <a href="#" className="p-2 bg-[#007ba7] hover:bg-[#005f81] text-white transition flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <button className="flex items-center gap-1 bg-[#0088cc] hover:bg-[#006699] text-white text-xs font-semibold px-3 py-2 transition ml-1 shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
                  Subscribe
                </button>
              </div>
            </div>
            
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-12 py-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300">
            {/* Mocked Partners Bar */}
            <div className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-white">
              <ShieldCheck className="h-6 w-6 text-blue-600" /> ISO Certified
            </div>
            <div className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-white">
              <Activity className="h-6 w-6 text-emerald-600" /> HL7 FHIR
            </div>
            <div className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-white">
              <Users className="h-6 w-6 text-indigo-600" /> Microsoft Partner
            </div>
          </div>

          <div className="text-center py-8 border-t border-slate-200 dark:border-white/10">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Copyright &copy; {new Date().getFullYear()} Aurora | Powered by Aurora HMS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
