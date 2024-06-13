// src/components/pages/SignIn.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';


function SignIn({ toggleForm }) {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      // Handle successful signin
      console.log('Sign in successful');
      navigate('/main'); 
    } catch (error) {
      setError('Failed to sign in. Please check your credentials and try again.');
      console.error('Error signing in:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto bg-white rounded-lg shadow-md">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input 
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 w-full mt-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="border p-2 w-full mt-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mt-4">Sign In</button>
    </form>
  );
}

export default SignIn;
