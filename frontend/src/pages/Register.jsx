import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    api.post('/users', {
      username: form.username,
      email: form.email,
      role: 'USER' // default role
    })
    .then(() => {
      toast.success('Registered! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    })
    .catch((err) => {
      console.error(err);
      toast.error("Registration failed. Try again.");
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border-none rounded shadow bg-white ">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-600">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Register
        </button>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
