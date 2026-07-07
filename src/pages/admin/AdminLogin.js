import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      setError('Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-purple-900/30 p-8 rounded-xl border border-purple-700/50 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full bg-purple-950/50 border border-purple-700/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-purple-950/50 border border-purple-700/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 mb-4"
        />

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
