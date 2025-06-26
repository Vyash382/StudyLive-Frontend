// pages/Login.jsx
import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userAtom } from '../recoils/userAtom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => navigate('/register');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      const loginResponse = await axios.post('https://studylive-backend.onrender.com/api/user/login', {
        email,
        password,
      });

      if (!loginResponse.data.type) {
        alert(loginResponse.data.message);
        return;
      }

      const token = loginResponse.data.token;
      localStorage.setItem('token', token);

      const detailsResponse = await axios.post(
        'https://studylive-backend.onrender.com/api/user/getDetails',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = detailsResponse.data.user;
      setUser({
        id: userData.id,
        email: userData.email,
      });

      alert('Login Successful');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Welcome to <span className="text-blue-400">StudyLive</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email address
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow-md transition-all duration-300"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400 text-center">
          Don’t have an account?{' '}
          <span onClick={handleRegister} className="text-blue-400 hover:underline cursor-pointer">
            Register here
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
