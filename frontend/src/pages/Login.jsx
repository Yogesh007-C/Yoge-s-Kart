import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { authService } from '../services/authService';
import { setUser } from '../redux/slices/authSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setApiError('');

      const result = await authService.login(data);
      
      if (result && result.token) {
        dispatch(setUser({
          user: result.user,
          token: result.token,
        }));
        
        // Use setTimeout to ensure state updates are applied
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 100);
      } else {
        setApiError('Invalid login response');
      }
    } catch (error) {
      console.error('Login error:', error);
      setApiError(error.response?.data?.message || error.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Login</h1>

          {apiError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email',
                  },
                })}
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-2">Password</label>
              <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              />
              {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold disabled:bg-gray-400"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
