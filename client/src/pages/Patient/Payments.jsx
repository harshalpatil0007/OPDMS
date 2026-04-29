import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { CreditCard, CheckCircle, Receipt, Clock } from 'lucide-react';

const Payments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [paidIds, setPaidIds] = useState([]);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      // Fetch all appointments for the patient
      const { data } = await api.get('/appointments');
      // Sort to show recent ones first
      setAppointments(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (err) {
      console.error('Failed to fetch appointments for payments', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (appId) => {
    // Simulate a payment gateway process
    setProcessingId(appId);
    
    try {
        // Simulate API delay for payment processing
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Use the new clinical release endpoint
        // This marks as completed AND generates dummy prescription if missing
        await api.post('/appointments/release-clinical-pack', { id: appId });

        setPaidIds(prev => [...prev, appId]);
        setSuccess('Payment successful! Your clinical record is now unlocked.');
        
        // Refresh list
        setTimeout(() => {
            fetchAppointments();
            setSuccess('');
        }, 2000);
    } catch (err) {
        console.error('Payment failed', err);
        alert('Payment processing failed.');
    } finally {
        setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4 border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold dark:text-white">Payments & Billing</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your outstanding balances and view receipts.</p>
      </div>

      <div className="card overflow-hidden">
        {success && (
          <div className="mx-6 mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-bold text-sm animate-in slide-in-from-top-2 duration-300">
             <CheckCircle size={20} /> {success}
          </div>
        )}
        {loading ? (
          <div className="animate-pulse space-y-4 p-6">
            <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded-xl" />
            <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded-xl" />
          </div>
        ) : appointments.length === 0 ? (
          <div className="py-12 text-center text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-xl">
            You don't have any bills or payment records yet.
          </div>
        ) : (
          <div className="space-y-4 p-6 bg-slate-50 dark:bg-slate-900/40">
            {appointments.map(app => {
              const fee = app.Doctor?.consultation_fees || 500; // fallback if fee is 0 or missing
              const isPaid = paidIds.includes(app.id) || app.status === 'Completed'; 
              // We assume 'Completed' means already paid in the past, or if we just paid it in our mock state

              return (
                <div key={app.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm gap-4 transition-all hover:shadow-md hover:border-blue-300">
                  <div className="flex gap-4 items-center">
                    <div className={`p-3 rounded-xl border ${isPaid ? 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-900/20 dark:border-emerald-500/30 dark:text-emerald-400' : 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-500/30 dark:text-blue-400'}`}>
                      {isPaid ? <Receipt size={24} /> : <CreditCard size={24} />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                        Consultation Fee: {app.Doctor?.specialization}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                        <span className="flex items-center gap-1 font-medium italic">{(app.Doctor?.name || '').startsWith('Dr.') ? app.Doctor?.name : `Dr. ${app.Doctor?.name || 'Specialist'}`}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="flex items-center gap-1"><Clock size={14} /> {app.date} • {app.time.substring(0,5)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 sm:gap-2 border-t sm:border-t-0 border-slate-100 dark:border-slate-700 pt-4 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Amount Due</p>
                      <p className={`text-xl font-bold ${isPaid ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                        ₹{Number(fee).toFixed(2)}
                      </p>
                    </div>

                    {isPaid ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-sm font-semibold">
                        <CheckCircle size={16} /> Paid
                      </span>
                    ) : (
                      <button 
                        onClick={() => handlePayment(app.id)}
                        disabled={processingId === app.id || app.status === 'Cancelled'}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm
                          ${app.status === 'Cancelled' ? 'bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-700' : 
                          'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-blue-500/25 hover:shadow-md disabled:bg-blue-400'}`}
                      >
                        {processingId === app.id ? (
                          <>Processing...</>
                        ) : app.status === 'Cancelled' ? (
                          <>Cancelled</>
                        ) : (
                          <>Pay Now</>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
