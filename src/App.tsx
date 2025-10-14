import { useState } from 'react';
import { Trophy, Users, Target, Award, LayoutDashboard, LogOut, Info, Bell } from 'lucide-react';
import Hero from './components/Hero';
import Features from './components/Features';
import Registration from './components/Registration';
import Login from './components/Login';
import TournamentInfo from './components/TournamentInfo';
import PreviousWinners from './components/PreviousWinners';
import Dashboard from './components/Dashboard';
import About from './components/About';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isAuthenticated, logout, user } = useAuth();
  const [activeSection, setActiveSection] = useState<'home' | 'register' | 'login' | 'tournaments' | 'winners' | 'dashboard' | 'highlights' | 'about'>(
    isAuthenticated ? 'dashboard' : 'home'
  );
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, type: 'tournament', message: 'New tournament starting in 1 hour!', time: '5 min ago' },
    { id: 2, type: 'win', message: 'Congratulations! You won $250', time: '2 hours ago' },
    { id: 3, type: 'match', message: 'Your match is ready', time: '1 day ago' }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Darker diagonal accent stripes background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-600/10"></div>
        <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-br from-orange-500/5 to-transparent transform -skew-x-12"></div>
        <div className="absolute top-0 -right-1/4 w-1/2 h-full bg-gradient-to-bl from-red-600/5 to-transparent transform skew-x-12"></div>
      </div>

      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-orange-500/20 rounded-2xl shadow-2xl shadow-black/50">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Trophy className="w-9 h-9 text-orange-500" />
                <div className="absolute -inset-1 bg-orange-500/20 blur-xl"></div>
              </div>
              <div>
                <span className="text-2xl font-black tracking-tighter text-white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  MTT
                </span>
                <div className="text-xs text-orange-500 font-bold tracking-wider uppercase -mt-1">
                  Micro Tournaments
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Navigation Buttons */}
              <div className="flex space-x-2">
                {(isAuthenticated ? [
                  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                  { id: 'tournaments', label: 'Tournaments', icon: Trophy },
                  { id: 'winners', label: 'Winners', icon: Award },
                  { id: 'highlights', label: 'Highlights', icon: Target },
                  { id: 'about', label: 'About', icon: Info }
                ] : [
                  { id: 'home', label: 'Home', icon: Target },
                  { id: 'tournaments', label: 'Tournaments', icon: Trophy },
                  { id: 'winners', label: 'Winners', icon: Award }
                ]).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as any)}
                    className={`group flex items-center space-x-2 px-4 py-2 rounded-xl font-bold uppercase text-xs tracking-wide transition-all duration-300 hover:scale-105 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/50 scale-105'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50 hover:shadow-md hover:shadow-orange-500/20'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 transition-transform duration-300 ${activeSection === item.id ? '' : 'group-hover:rotate-12 group-hover:scale-110'}`} />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Auth Buttons */}
              {!isAuthenticated && (
                <>
                  <button
                    onClick={() => setActiveSection('login')}
                    className="group flex items-center space-x-2 px-4 py-2 rounded-xl font-bold uppercase text-xs tracking-wide transition-all duration-300 hover:scale-105 text-slate-400 hover:text-white hover:bg-slate-800/50 hover:shadow-md hover:shadow-orange-500/20"
                  >
                    <LogOut className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                    <span className="hidden sm:inline">Login</span>
                  </button>
                  <button
                    onClick={() => setActiveSection('register')}
                    className="group flex items-center space-x-2 px-4 py-2 rounded-xl font-bold uppercase text-xs tracking-wide transition-all duration-300 hover:scale-105 bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
                  >
                    <Users className="w-4 h-4" />
                    <span className="hidden sm:inline">Register</span>
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-orange-500" />
              <span className="text-slate-300 font-bold">Micro Tournaments 2025</span>
            </div>
            <div className="flex items-center space-x-6 text-orange-500 text-sm font-bold uppercase tracking-wide">
              <span>Compete. Dominate. Win.</span>
            </div>
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
      </footer>
    </div>
  );
}

export default App;
