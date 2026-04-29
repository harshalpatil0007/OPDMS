import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useEffect } from 'react';
import { Home, Users, Stethoscope, Calendar, LogOut, FileText, X, CreditCard, Activity, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, isCollapsed, onToggle }) => {
  const { user } = useSelector(state => state.auth);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Auto-close sidebar on mobile when route changes
  useEffect(() => {
    if (isOpen) {
        onClose?.();
    }
  }, [pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    onClose?.();
  };

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: Home },
    { name: 'Doctors', path: '/admin/doctors', icon: Stethoscope },
    { name: 'Patients', path: '/admin/patients', icon: Users },
    { name: 'Profile', path: '/profile', icon: Users },
  ];

  const doctorLinks = [
    { name: 'Dashboard', path: '/doctor', icon: Home },
    { name: 'My Appointments', path: '/doctor/appointments', icon: Calendar },
    { name: 'Profile', path: '/profile', icon: Users },
  ];

  const patientLinks = [
    { name: 'Dashboard', path: '/patient', icon: Home },
    { name: 'Book Appointment', path: '/patient/book', icon: Calendar },
    { name: 'My History', path: '/patient/history', icon: FileText },
    { name: 'Prescriptions', path: '/patient/prescriptions', icon: Activity },
    { name: 'Payments', path: '/patient/payments', icon: CreditCard },
    { name: 'Profile', path: '/profile', icon: Users },
  ];

  let links = [];
  if (user?.role === 'admin') links = adminLinks;
  if (user?.role === 'doctor') links = doctorLinks;
  if (user?.role === 'patient') links = patientLinks;

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xl border-r border-slate-200 dark:border-slate-800 z-40 transform transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-72'
        } ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className={`p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-blue-600 dark:text-blue-400 ${isCollapsed ? 'px-4' : 'px-6'}`}>
          <NavLink 
            to="/"
            className="flex items-center gap-2 overflow-hidden truncate hover:scale-[1.02] transition-all group"
          >
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20 group-hover:bg-blue-500 transition-colors">
               <Stethoscope size={18} className="text-white shrink-0" /> 
            </div>
            {!isCollapsed && <span className="font-extrabold text-xl animate-in fade-in duration-300 tracking-tight text-slate-900 dark:text-white">Aurora HMS</span>}
          </NavLink>
          <button className="lg:hidden rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={onClose}>
            <X size={18} />
          </button>
          
          {/* Desktop Toggle Button */}
          {!isOpen && (
             <button 
                onClick={onToggle}
                className="hidden lg:flex absolute -right-3 top-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full p-1 shadow-md text-slate-400 hover:text-blue-600 transition-colors z-50"
             >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
             </button>
          )}
        </div>
        
        {!isCollapsed && (
          <div className="px-6 pt-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 animate-in slide-in-from-left-2 duration-300">
             Internal Ops: {user?.role}
          </div>
        )}

        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
          <nav className="space-y-2 px-3">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-3 py-3 rounded-2xl transition-all duration-300 group relative ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-blue-600'
                    }`
                  }
                >
                  <Icon size={22} className="shrink-0 group-hover:scale-110 transition-transform" />
                  {!isCollapsed && (
                    <span className="font-bold text-sm tracking-tight animate-in fade-in slide-in-from-left-2 duration-300">
                        {link.name}
                    </span>
                  )}
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl border border-slate-800">
                        {link.name}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className={`p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 transition-all ${isCollapsed ? 'items-center' : ''}`}>
          {!isCollapsed && (
            <div className="mb-6 px-3 animate-in fade-in duration-300">
              <p className="text-sm font-black text-slate-900 dark:text-white truncate">
                {user?.role === 'doctor' 
                  ? ((user?.name || '').startsWith('Dr.') ? user?.name : `Dr. ${user?.name || 'Doctor'}`)
                  : user?.name}
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{user?.role}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-4 w-full px-3 py-3 text-slate-500 dark:text-slate-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all group relative ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={22} className="shrink-0 group-hover:rotate-12 transition-transform" />
            {!isCollapsed && <span className="font-bold text-sm">Sign Out</span>}
            {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-red-600 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                    Sign Out
                </div>
            )}
          </button>
        </div>
      </div>
      {/* overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-[2px] animate-in fade-in duration-300" onClick={onClose} />}
    </>
  );
};

export default Sidebar;
