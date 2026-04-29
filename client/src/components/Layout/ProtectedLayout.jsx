import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const ProtectedLayout = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />
      <div className={`flex-1 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-72'} p-4 sm:p-6 lg:p-8 overflow-y-auto overflow-x-hidden transition-all duration-300`}>
        <div className="mb-4 lg:hidden flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl border border-slate-200 bg-white text-slate-700 p-2 shadow hover:shadow-md transition"
          >
            <Menu size={20} />
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Aurora HMS</p>
            <p className="text-sm text-slate-700 capitalize">{user?.role}</p>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
