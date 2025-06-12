import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    function handleLogin(){
        navigate('/login')
    }
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    profilePhoto: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'profilePhoto') {
      setForm({ ...form, profilePhoto: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register:', form);
    // Handle registration logic here
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
          Sign up for <span className="text-blue-400">StudyLive</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Your name"
            />
          </div>

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

          <div>
            <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-300">
              Profile Photo
            </label>
            <input
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full text-white file:bg-blue-500 file:hover:bg-blue-600 file:text-white file:rounded-lg file:px-4 file:py-2 file:border-0 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none transition-all"
            />
          </div>

          <button
            onClick={handleLogin}
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow-md transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-400 hover:underline">
            Log in here
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
