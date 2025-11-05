import { useState, useEffect } from 'react';
import { Trophy, Users, Target, Award, LayoutDashboard, LogOut, Info, Bell, Mail } from 'lucide-react';
import Hero from './components/Hero';
import Features from './components/Features';
import Registration from './components/Registration';
import Login from './components/Login';
import TournamentInfo from './components/TournamentInfo';
import PreviousWinners from './components/PreviousWinners';
import Dashboard from './components/Dashboard';
import About from './components/About';
import { useAuth } from './contexts/AuthContext';
import { supabase } from './lib/supabase';

interface Notification {
  id: number;
  type: string;
  message: string;
  time: string;
}

function App() {
  const { isAuthenticated, logout, user } = useAuth();
  const [activeSection, setActiveSection] = useState<'home' | 'register' | 'login' | 'tournaments' | 'winners' | 'dashboard' | 'highlights' | 'about'>(
    isAuthenticated ? 'dashboard' : 'home'
  );
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadNotifications();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const handleOpenRegister = () => {
      setActiveSection('register');
    };
    const handleOpenLogin = () => {
      setActiveSection('login');
    };

    window.addEventListener('openRegister', handleOpenRegister);
    window.addEventListener('openLogin', handleOpenLogin);

    return () => {
      window.removeEventListener('openRegister', handleOpenRegister);
      window.removeEventListener('openLogin', handleOpenLogin);
    };
  }, []);

  const loadNotifications = async () => {
    if (!user) return;

    try {
      const notificationsList: Notification[] = [];

      const { data: upcomingTournaments } = await supabase
        .from('tournaments')
        .select('*')
        .eq('status', 'upcoming')
        .order('start_date', { ascending: true })
        .limit(2);

      upcomingTournaments?.forEach((tournament, index) => {
        const startDate = new Date(tournament.start_date);
        const now = new Date();
        const diffHours = Math.floor((startDate.getTime() - now.getTime()) / (1000 * 60 * 60));

        if (diffHours <= 24 && diffHours > 0) {
          let timeStr = '';
          if (diffHours < 1) {
            const diffMinutes = Math.floor((startDate.getTime() - now.getTime()) / (1000 * 60));
            timeStr = `starting in ${diffMinutes} minutes`;
          } else if (diffHours === 1) {
            timeStr = 'starting in 1 hour';
          } else if (diffHours < 24) {
            timeStr = `starting in ${diffHours} hours`;
          }

          notificationsList.push({
            id: index + 1,
            type: 'tournament',
            message: `${tournament.title} ${timeStr}!`,
            time: timeStr
          });
        }
      });

      const { data: recentWins } = await supabase
        .from('matches')
        .select('*, tournaments(title, prize_pool)')
        .eq('winner_id', user.id)
        .eq('status', 'completed')
        .order('completed_at', { ascending: false })
        .limit(2);

      recentWins?.forEach((match: any) => {
        const completedDate = new Date(match.completed_at);
        const now = new Date();
        const diffHours = Math.floor((now.getTime() - completedDate.getTime()) / (1000 * 60 * 60));

        let timeStr = '';
        if (diffHours < 1) {
          timeStr = 'just now';
        } else if (diffHours === 1) {
          timeStr = '1 hour ago';
        } else if (diffHours < 24) {
          timeStr = `${diffHours} hours ago`;
        } else {
          const diffDays = Math.floor(diffHours / 24);
          timeStr = diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
        }

        const prize = match.tournaments?.prize_pool ? `$${Math.floor(match.tournaments.prize_pool / 2)}` : '$100';

        notificationsList.push({
          id: notificationsList.length + 1,
          type: 'win',
          message: `Congratulations! You won ${prize} in ${match.tournaments?.title || 'tournament'}`,
          time: timeStr
        });
      });

      const { data: upcomingMatches } = await supabase
        .from('matches')
        .select('*, tournaments(title)')
        .or(`player1_id.eq.${user.id},player2_id.eq.${user.id}`)
        .eq('status', 'upcoming')
        .order('scheduled_time', { ascending: true })
        .limit(1);

      upcomingMatches?.forEach((match: any) => {
        if (match.scheduled_time) {
          const matchDate = new Date(match.scheduled_time);
          const now = new Date();
          const diffMinutes = Math.floor((matchDate.getTime() - now.getTime()) / (1000 * 60));

          if (diffMinutes <= 30 && diffMinutes > 0) {
            notificationsList.push({
              id: notificationsList.length + 1,
              type: 'match',
              message: `Your match in ${match.tournaments?.title || 'tournament'} starts in ${diffMinutes} minutes`,
              time: `${diffMinutes} min`
            });
          }
        }
      });

      setNotifications(notificationsList);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Darker diagonal accent stripes background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-600/10"></div>
        <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-br from-orange-500/5 to-transparent transform -skew-x-12"></div>
        <div className="absolute top-0 -right-1/4 w-1/2 h-full bg-gradient-to-bl from-red-600/5 to-transparent transform skew-x-12"></div>
      </div>

      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-3 sm:px-4">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-orange-500/20 rounded-2xl shadow-2xl shadow-black/50">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="relative">
                <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500" />
                <div className="absolute -inset-1 bg-orange-500/20 blur-xl"></div>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black tracking-tighter text-white">MTT</span>
                <div className="text-xs text-orange-500 font-bold tracking-wider uppercase -mt-1">Tournaments</div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setActiveSection('dashboard')}
                    className={`px-3 sm:px-5 py-2 rounded-lg font-bold uppercase text-xs sm:text-sm transition-all ${
                      activeSection === 'dashboard'
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setActiveSection('tournaments')}
                    className={`px-3 sm:px-5 py-2 rounded-lg font-bold uppercase text-xs sm:text-sm transition-all ${
                      activeSection === 'tournaments'
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    Tournaments
                  </button>
                  <button
                    onClick={() => setActiveSection('winners')}
                    className={`px-3 sm:px-5 py-2 rounded-lg font-bold uppercase text-xs sm:text-sm transition-all ${
                      activeSection === 'winners'
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    Winners
                  </button>
                  <button
                    onClick={() => setActiveSection('about')}
                    className={`px-3 sm:px-5 py-2 rounded-lg font-bold uppercase text-xs sm:text-sm transition-all ${
                      activeSection === 'about'
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => logout()}
                    className="px-3 sm:px-5 py-2 bg-slate-800/50 text-slate-300 hover:text-white rounded-lg font-bold uppercase text-xs sm:text-sm transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setActiveSection('home')}
                    className={`px-3 sm:px-5 py-2 rounded-lg font-bold uppercase text-xs sm:text-sm transition-all ${
                      activeSection === 'home'
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => setActiveSection('tournaments')}
                    className={`px-3 sm:px-5 py-2 rounded-lg font-bold uppercase text-xs sm:text-sm transition-all ${
                      activeSection === 'tournaments'
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    Tournaments
                  </button>
                  <button
                    onClick={() => setActiveSection('winners')}
                    className={`px-3 sm:px-5 py-2 rounded-lg font-bold uppercase text-xs sm:text-sm transition-all ${
                      activeSection === 'winners'
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    Winners
                  </button>
                  <button
                    onClick={() => setActiveSection('login')}
                    className="px-3 sm:px-5 py-2 text-slate-300 hover:text-white rounded-lg font-bold uppercase text-xs sm:text-sm transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setActiveSection('register')}
                    className="px-3 sm:px-5 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-bold uppercase text-xs sm:text-sm transition-all hover:shadow-lg hover:shadow-orange-500/50"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Notification Button (Fixed position below nav bar) */}
      {isAuthenticated && (
        <div className="fixed top-32 right-8 z-40">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="group relative flex items-center justify-center w-14 h-14 bg-slate-900/90 backdrop-blur-xl border-2 border-orange-500/30 rounded-full text-slate-400 hover:text-white hover:border-orange-500/60 transition-all duration-300 hover:scale-110 shadow-2xl shadow-black/50"
          >
            <Bell className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-white text-xs font-black flex items-center justify-center animate-pulse border-2 border-slate-900">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-20 w-80 bg-slate-900/95 backdrop-blur-xl border-2 border-orange-500/30 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-orange-500/20">
                <h3 className="font-black text-white uppercase text-sm">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-4 border-b border-slate-800 hover:bg-orange-500/5 transition-colors cursor-pointer"
                  >
                    <p className="text-white font-bold text-sm mb-1">{notif.message}</p>
                    <span className="text-slate-500 text-xs">{notif.time}</span>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t border-orange-500/20">
                <button className="text-orange-500 hover:text-orange-400 font-bold text-xs uppercase">
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="pt-32 relative z-10">
        {!isAuthenticated && activeSection === 'home' && (
          <>
            <Hero onRegister={() => setActiveSection('register')} onViewTournaments={() => setActiveSection('tournaments')} />
            <Features />
          </>
        )}
        {!isAuthenticated && activeSection === 'register' && (
          <Registration
            onSuccess={() => setActiveSection('dashboard')}
            onSwitchToLogin={() => setActiveSection('login')}
          />
        )}
        {!isAuthenticated && activeSection === 'login' && (
          <Login
            onSuccess={() => setActiveSection('dashboard')}
            onSwitchToRegister={() => setActiveSection('register')}
          />
        )}
        {activeSection === 'dashboard' && isAuthenticated && <Dashboard />}
        {activeSection === 'tournaments' && <TournamentInfo />}
        {activeSection === 'winners' && <PreviousWinners />}
        {activeSection === 'highlights' && isAuthenticated && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-5xl font-black text-white mb-4 uppercase">Highlights</h1>
              <p className="text-slate-400 font-bold">Epic moments coming soon!</p>
            </div>
          </div>
        )}
        {activeSection === 'about' && <About />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/80 border-t border-orange-500/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex flex-col items-center md:items-start space-y-2">
              <div className="flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-orange-500" />
                <span className="text-slate-300 font-bold">Micro Tournaments 2025</span>
              </div>
              <p className="text-slate-500 text-sm text-center md:text-left">Compete. Dominate. Win.</p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <h3 className="text-white font-black uppercase tracking-wide text-sm">Help & Support</h3>
              <a
                href="mailto:microtournaments4@gmail.com"
                className="text-orange-500 hover:text-orange-400 transition-colors font-medium text-sm flex items-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>microtournaments4@gmail.com</span>
              </a>
            </div>

            <div className="flex flex-col items-center md:items-end">
              {isAuthenticated && (
                <button
                  onClick={() => {
                    logout();
                    setActiveSection('home');
                  }}
                  className="group flex items-center space-x-2 px-6 py-3 rounded-xl font-bold uppercase text-sm tracking-wide transition-all duration-300 hover:scale-105 bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
                >
                  <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>

          <div className="pt-8 border-t border-orange-500/10 text-center">
            <p className="text-slate-500 text-sm">
              &copy; 2025 Micro Tournaments. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
