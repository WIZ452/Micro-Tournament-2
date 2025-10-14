import { Trophy, Target, Award, TrendingUp, Calendar, Zap, Medal, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Dashboard() {
  const { user } = useAuth();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

  const stats = [
    { icon: Trophy, label: 'Tournaments Played', value: '12', color: 'from-orange-500 to-red-600' },
    { icon: Award, label: 'Wins', value: '3', color: 'from-yellow-500 to-orange-500' },
    { icon: Target, label: 'Win Rate', value: '25%', color: 'from-red-500 to-orange-600' },
    { icon: TrendingUp, label: 'Rank', value: '#247', color: 'from-orange-600 to-red-500' }
  ];

  const recentMatches = [
    { tournament: 'Weekend Warriors', date: 'Oct 3, 2025', placement: '1st', prize: '$250', status: 'won' },
    { tournament: 'Friday Night Showdown', date: 'Oct 2, 2025', placement: '4th', prize: '-', status: 'lost' },
    { tournament: 'Midweek Madness', date: 'Sep 30, 2025', placement: '2nd', prize: '$150', status: 'won' }
  ];

  const upcomingTournaments = [
    { name: 'Saturday Showdown', time: 'Today, 8:00 PM', slots: '14/16', prize: '$500' },
    { name: 'Sunday Championship', time: 'Tomorrow, 6:00 PM', slots: '8/32', prize: '$1000' },
    { name: 'Monday Madness', time: 'Oct 7, 7:00 PM', slots: '12/16', prize: '$300' }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div
          ref={headerRef}
          className={`mb-12 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative bg-black/60 backdrop-blur border-2 border-orange-500/30 rounded-2xl p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
                  Welcome Back, <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">{user?.gamertag}</span>
                </h1>
                <p className="text-slate-400 font-bold">Ready to dominate the competition?</p>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 blur-2xl opacity-50 animate-pulse"></div>
                  <Crown className="relative w-20 h-20 text-orange-500" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 transition-all duration-1000 ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-black/80 border-2 border-orange-500/30 rounded-2xl p-6 backdrop-blur group-hover:border-orange-500/60 transition-all hover:scale-105 duration-300">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl mb-3 shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Matches */}
          <div className="relative bg-black/60 backdrop-blur border-2 border-orange-500/30 rounded-2xl p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center">
                  <Medal className="w-6 h-6 text-orange-500 mr-3" strokeWidth={2.5} />
                  Recent Matches
                </h2>
              </div>
              <div className="space-y-4">
                {recentMatches.map((match, index) => (
                  <div
                    key={index}
                    className="bg-black/60 border-2 border-slate-700/50 rounded-xl p-4 hover:border-orange-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-black text-white uppercase text-sm">{match.tournament}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                        match.status === 'won'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                          : 'bg-red-500/20 text-red-400 border border-red-500/50'
                      }`}>
                        {match.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400 font-medium">{match.date}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-orange-400 font-bold">{match.placement}</span>
                        {match.prize !== '-' && (
                          <span className="text-green-400 font-black">{match.prize}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Tournaments */}
          <div className="relative bg-black/60 backdrop-blur border-2 border-orange-500/30 rounded-2xl p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center">
                  <Calendar className="w-6 h-6 text-orange-500 mr-3" strokeWidth={2.5} />
                  Upcoming
                </h2>
              </div>
              <div className="space-y-4">
                {upcomingTournaments.map((tournament, index) => (
                  <div
                    key={index}
                    className="bg-black/60 border-2 border-slate-700/50 rounded-xl p-4 hover:border-orange-500/50 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-black text-white uppercase text-sm mb-1">{tournament.name}</h3>
                        <p className="text-slate-400 text-xs font-medium flex items-center">
                          <Zap className="w-3 h-3 mr-1 text-orange-500" />
                          {tournament.time}
                        </p>
                      </div>
                      <span className="text-green-400 font-black text-sm">{tournament.prize}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-bold uppercase">{tournament.slots} Registered</span>
                      <button className="px-4 py-1.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg text-xs font-black uppercase hover:shadow-lg hover:shadow-orange-500/50 transition-all group-hover:scale-105">
                        Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-8 relative bg-black/60 backdrop-blur border-2 border-orange-500/30 rounded-2xl p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-2xl"></div>
          <div className="relative">
            <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tight flex items-center">
              <Trophy className="w-7 h-7 text-orange-500 mr-3" strokeWidth={2.5} />
              Recent Achievements
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Trophy, title: 'First Victory', description: 'Won your first tournament', unlocked: true },
                { icon: Target, title: 'Sharpshooter', description: 'Win 5 tournaments', unlocked: false, progress: '3/5' },
                { icon: Crown, title: 'Champion', description: 'Win 10 tournaments', unlocked: false, progress: '3/10' }
              ].map((achievement, index) => (
                <div
                  key={index}
                  className={`bg-black/60 border-2 rounded-xl p-6 text-center transition-all ${
                    achievement.unlocked
                      ? 'border-orange-500/50 hover:border-orange-500/70'
                      : 'border-slate-700/50 opacity-60'
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-orange-500 to-red-600 shadow-xl'
                      : 'bg-slate-800'
                  }`}>
                    <achievement.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-black text-white uppercase text-sm mb-2">{achievement.title}</h3>
                  <p className="text-slate-400 text-xs mb-2">{achievement.description}</p>
                  {!achievement.unlocked && achievement.progress && (
                    <span className="text-orange-400 text-xs font-bold">{achievement.progress}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
