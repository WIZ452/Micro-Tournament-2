import { useState } from 'react';
import { User, Mail, Gamepad2, Trophy, CheckCircle2, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface RegistrationProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export default function Registration({ onSuccess, onSwitchToLogin }: RegistrationProps) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    playerName: '',
    email: '',
    gamertag: '',
    password: '',
    skillLevel: 'intermediate'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: insertError } = await supabase
        .from('players')
        .insert([
          {
            player_name: formData.playerName,
            email: formData.email,
            gamertag: formData.gamertag,
            password: formData.password,
            skill_level: formData.skillLevel,
            role: 'user'
          }
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      setSuccess(true);

      if (data) {
        login({
          id: data.id,
          playerName: data.player_name,
          email: data.email,
          gamertag: data.gamertag,
          skillLevel: data.skill_level,
          role: data.role || 'user'
        });

        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 1500);
      }

      setFormData({
        playerName: '',
        email: '',
        gamertag: '',
        password: '',
        skillLevel: 'intermediate'
      });
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 blur-2xl opacity-50"></div>
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-2xl">
              <Trophy className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
            Join the Competition
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mb-4"></div>
          <p className="text-xl text-slate-400 font-bold">
            Register now and start your journey to becoming a champion
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-500/10 border-2 border-green-500/50 rounded-2xl p-6 mb-8 flex items-center space-x-4 shadow-xl shadow-green-500/20">
            <CheckCircle2 className="w-8 h-8 text-green-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-black text-green-400 mb-1 uppercase">Registration Successful!</h3>
              <p className="text-green-300 font-medium">Welcome to Micro Tournaments. Check your email for next steps.</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border-2 border-red-500/50 rounded-2xl p-6 mb-8 shadow-xl shadow-red-500/20">
            <p className="text-red-400 font-bold">{error}</p>
          </div>
        )}

        {/* Registration Form */}
        <div className="relative bg-black/60 backdrop-blur border-2 border-orange-500/30 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-2xl"></div>
          <form onSubmit={handleSubmit} className="relative space-y-6">
            {/* Player Name */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.playerName}
                  onChange={(e) => setFormData({ ...formData, playerName: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-black/80 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-black/80 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Gamertag */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                Gamertag
              </label>
              <div className="relative">
                <Gamepad2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.gamertag}
                  onChange={(e) => setFormData({ ...formData, gamertag: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-black/80 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
                  placeholder="ProGamer123"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-black/80 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
                  placeholder="Enter a secure password"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Skill Level */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                Skill Level
              </label>
              <select
                value={formData.skillLevel}
                onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value })}
                className="w-full px-4 py-3 bg-black/80 border-2 border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white rounded-xl font-black text-xl shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 uppercase tracking-wide border-2 border-orange-400/50"
            >
              {loading ? 'Registering...' : 'Complete Registration'}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="relative mt-6 text-center">
            <p className="text-slate-400 font-medium">
              Already have an account?{' '}
              {onSwitchToLogin && (
                <button
                  onClick={onSwitchToLogin}
                  className="text-orange-500 hover:text-orange-400 font-black uppercase transition-colors"
                >
                  Login Here
                </button>
              )}
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-slate-700">
            <p className="text-center text-slate-400 text-sm">
              By registering, you agree to our tournament rules and code of conduct
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
