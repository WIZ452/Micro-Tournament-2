import { useState } from 'react';
import { Mail, Lock, LogIn, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export default function Login({ onSuccess, onSwitchToRegister }: LoginProps) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: queryError } = await supabase
        .from('players')
        .select('*')
        .eq('email', formData.email)
        .maybeSingle();

      if (queryError) throw queryError;

      if (!data || data.password !== formData.password) {
        throw new Error('Invalid email or password. Please try again or register.');
      }

      login({
        id: data.id,
        playerName: data.player_name,
        email: data.email,
        gamertag: data.gamertag,
        skillLevel: data.skill_level,
        role: data.role || 'user'
      });

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 blur-2xl opacity-50"></div>
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-2xl">
              <LogIn className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
            Login
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mb-4"></div>
          <p className="text-xl text-slate-400 font-bold">
            Welcome back, champion
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border-2 border-red-500/50 rounded-2xl p-6 mb-8 shadow-xl shadow-red-500/20">
            <p className="text-red-400 font-bold">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <div className="relative bg-black/60 backdrop-blur border-2 border-orange-500/30 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-2xl"></div>

          <form onSubmit={handleSubmit} className="relative space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-black/80 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3 bg-black/80 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white rounded-xl font-black text-xl shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 uppercase tracking-wide border-2 border-orange-400/50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Switch to Register */}
          <div className="relative mt-6 text-center">
            <p className="text-slate-400 font-medium">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-orange-500 hover:text-orange-400 font-black uppercase transition-colors"
              >
                Register Now
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
