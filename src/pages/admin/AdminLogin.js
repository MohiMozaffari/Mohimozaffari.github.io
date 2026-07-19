import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const inputClasses =
  'w-full rounded-lg border border-line bg-surface-overlay px-4 py-3 text-sm text-content placeholder-content-faint transition-colors focus:border-iris-500 focus:outline-none';

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
    <div className="relative z-10 flex min-h-screen items-center justify-center bg-ink px-4">
      <Card
        as="form"
        onSubmit={handleSubmit}
        padding="lg"
        radius="xl"
        raise
        interactive={false}
        className="w-full max-w-sm"
      >
        <h1 className="text-center font-display text-h2 font-semibold tracking-tight text-iris-200">
          Admin Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={`mt-6 ${inputClasses}`}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={`mt-4 ${inputClasses}`}
        />

        {error && <p className="mt-4 text-sm text-coral-400">{error}</p>}

        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="mt-6 w-full text-center disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </Button>
      </Card>
    </div>
  );
};

export default AdminLogin;
