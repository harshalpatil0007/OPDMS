import { useState, useEffect } from 'react';
import { Users, Stethoscope, CalendarCheck } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import api from '../../utils/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    counts: { patients: 0, doctors: 0, appointments: 0 },
    chartData: { scheduled: 0, completed: 0, cancelled: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get('/admin/dashboard');
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const chartDataConfig = {
    labels: ['Scheduled', 'Completed', 'Cancelled'],
    datasets: [
      {
        label: 'Appointments Status',
        data: [stats.chartData.scheduled, stats.chartData.completed, stats.chartData.cancelled],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)', // Blue
          'rgba(16, 185, 129, 0.7)', // Green
          'rgba(239, 68, 68, 0.7)',  // Red
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' }
    }
  };

  if (loading) return <div className="text-gray-500 animate-pulse">Loading analytics...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Overview of hospital analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card flex items-center space-x-4">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
            <Users size={32} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Patients</p>
            <h3 className="text-3xl font-bold dark:text-white">{stats.counts.patients}</h3>
          </div>
        </div>
        <div className="card flex items-center space-x-4">
          <div className="p-4 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
            <Stethoscope size={32} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Verified Doctors</p>
            <h3 className="text-3xl font-bold dark:text-white">{stats.counts.doctors}</h3>
          </div>
        </div>
        <div className="card flex items-center space-x-4">
          <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
            <CalendarCheck size={32} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Appointments</p>
            <h3 className="text-3xl font-bold dark:text-white">{stats.counts.appointments}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card h-96">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Appointments Tracking</h3>
          <div className="h-72">
            <Bar data={chartDataConfig} options={chartOptions} />
          </div>
        </div>
        <div className="card h-96 overflow-y-auto">
           <h3 className="text-lg font-semibold mb-4 dark:text-white">System Actions</h3>
           <p className="text-gray-500">
               Welcome to the admin panel. Use the sidebar to navigate towards detailed tables where you can add, edit, or remove Doctors and Patients.
           </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
