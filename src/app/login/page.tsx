"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { initializeSocket } from '@/lib/SocketProvider';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Login success');

      const socket = initializeSocket();

      socket.emit('user_loggined', {email});
      
    } catch (error: any) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-black dark:bg-grid-white/[0.2]">
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-black">
        <h1 className="text-3xl font-bold mb-6">{loading ? 'Processing' : 'Login'}</h1>
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
          <div className="space-y-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 p-3 rounded-md focus:outline-none focus:bg-indigo-600 hover:bg-indigo-600"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className='text-blue-500 hover:underline'>
            signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
