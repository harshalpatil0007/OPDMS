import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthPage from '../AuthPage';
import api from '../../utils/api';
import { loginSuccess } from '../../store/authSlice';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (payload) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', payload);
      dispatch(loginSuccess(res.data));
      navigate(`/${res.data.user.role}`);
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (payload) => {
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', payload);
      const loginRes = await api.post('/auth/login', payload);
      dispatch(loginSuccess(loginRes.data));
      navigate(`/${loginRes.data.user.role}`);
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return <AuthPage initialMode="login" onLogin={handleLogin} onRegister={handleRegister} loading={loading} error={error} />;
}
