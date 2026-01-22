import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { authService } from '../services/authService';
import { setUser } from '../redux/slices/authSlice';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setApiError('');

      const result = await authService.register(data);
      
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
        setApiError('Invalid registration response');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setApiError(error.response?.data?.message || error.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Register</h1>

          {apiError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Username</label>
              <input
                {...register('username', {
                  required: 'Username is required',
                  minLength: { value: 3, message: 'Username must be at least 3 characters' },
                })}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              />
              {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
            </div>

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
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              />
              {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-2">Confirm Password</label>
              <input
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                })}
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-bold disabled:bg-gray-400"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
