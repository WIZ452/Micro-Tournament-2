import { useState, useEffect } from 'react';
import { Trophy, Target, Award, TrendingUp, Calendar, Zap, Medal, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { supabase } from '../lib/supabase';

interface PlayerStats {
  tournamentsPlayed: number;
  wins: number;
  winRate: string;
  rank: number;
}

interface RecentMatch {
  tournament: string;
  date: string;
  placement: string;
  prize: string;
  status: 'won' | 'lost';
}

interface UpcomingTournament {
  id: string;
  name: string;
  time: string;
  slots: string;
  prize: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

  const [stats, setStats] = useState<PlayerStats>({
    tournamentsPlayed: 0,
    wins: 0,
    winRate: '0%',
    rank: 0
  });
  const [recentMatches, setRecentMatches] = useState<RecentMatch[]>([]);
  const [upcomingTournaments, setUpcomingTournaments] = useState<UpcomingTournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadPlayerData();
    }
  }, [user]);

  const loadPlayerData = async () => {
    if (!user) return;

    try {
      const { data: registrations, error: regError } = await supabase
        .from('tournament_registrations')
        .select('tournament_id')
        .eq('player_id', user.id);

      const tournamentsPlayed = registrations?.length || 0;

      const { data: wonMatches, error: matchError } = await supabase
        .from('matches')
        .select('id')
        .eq('winner_id', user.id)
        .eq('status', 'completed');

      const wins = wonMatches?.length || 0;
      const winRate = tournamentsPlayed > 0
        ? Math.round((wins / tournamentsPlayed) * 100) + '%'
        : '0%';

      const { data: allPlayers, error: playersError } = await supabase
        .from('players')
        .select('id');

      const totalPlayers = allPlayers?.length || 0;

      const { data: playerWins } = await supabase
        .from('matches')
        .select('winner_id')
        .eq('status', 'completed');

      const winCounts = new Map<string, number>();
      playerWins?.forEach(match => {
        if (match.winner_id) {
          winCounts.set(match.winner_id, (winCounts.get(match.winner_id) || 0) + 1);
        }
      });

      const sortedPlayers = Array.from(winCounts.entries())
        .sort((a, b) => b[1] - a[1]);

      const userRankIndex = sortedPlayers.findIndex(([id]) => id === user.id);
      const rank = userRankIndex >= 0 ? userRankIndex + 1 : totalPlayers;

      setStats({
        tournamentsPlayed,
        wins,
        winRate,
        rank
      });

      const { data: matches } = await supabase
        .from('matches')
        .select(`
          id,
          tournament_id,
          player1_id,
          player2_id,
          player1_score,
          player2_score,
          winner_id,
          completed_at,
          tournaments (title)
        `)
        .or(`player1_id.eq.${user.id},player2_id.eq.${user.id}`)
        .eq('status', 'completed')
        .order('completed_at', { ascending: false })
        .limit(3);

      const formattedMatches: RecentMatch[] = matches?.map((match: any) => {
        const isWinner = match.winner_id === user.id;
        const isPlayer1 = match.player1_id === user.id;
        const playerScore = isPlayer1 ? match.player1_score : match.player2_score;
        const opponentScore = isPlayer1 ? match.player2_score : match.player1_score;

        let placement = '4th';
        if (isWinner) {
          placement = '1st';
        } else if (playerScore > 0) {
          placement = '2nd';
        }

        return {
          tournament: match.tournaments?.title || 'Unknown Tournament',
          date: new Date(match.completed_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          placement,
          prize: isWinner ? '$100' : '-',
          status: isWinner ? 'won' : 'lost'
        };
      }) || [];

      setRecentMatches(formattedMatches);

      const { data: tournaments } = await supabase
        .from('tournaments')
        .select('*')
        .eq('status', 'upcoming')
        .order('start_date', { ascending: true })
        .limit(3);

      const formattedTournaments: UpcomingTournament[] = tournaments?.map(tournament => {
        const startDate = new Date(tournament.start_date);
        const now = new Date();
        const diffDays = Math.floor((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        let timeStr = startDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit'
        });

        if (diffDays === 0) {
          timeStr = 'Today, ' + startDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
          });
        } else if (diffDays === 1) {
          timeStr = 'Tomorrow, ' + startDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
          });
        }

        return {
          id: tournament.id,
          name: tournament.title,
          time: timeStr,
          slots: `${tournament.current_players}/${tournament.max_players}`,
          prize: `$${tournament.prize_pool}`
        };
      }) || [];

      setUpcomingTournaments(formattedTournaments);
      setLoading(false);
    } catch (error) {
      console.error('Error loading player data:', error);
      setLoading(false);
    }
  };

  const statsDisplay = [
    { icon: Trophy, label: 'Tournaments Played', value: stats.tournamentsPlayed.toString(), color: 'from-orange-500 to-red-600' },
    { icon: Award, label: 'Wins', value: stats.wins.toString(), color: 'from-yellow-500 to-orange-500' },
    { icon: Target, label: 'Win Rate', value: stats.winRate, color: 'from-red-500 to-orange-600' },
    { icon: TrendingUp, label: 'Rank', value: stats.rank > 0 ? `#${stats.rank}` : 'N/A', color: 'from-orange-600 to-red-500' }
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
          {statsDisplay.map((stat, index) => (
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
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-slate-400 font-medium">Loading...</p>
                  </div>
                ) : recentMatches.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-400 font-medium">No recent matches yet. Join a tournament to get started!</p>
                  </div>
                ) : (
                  recentMatches.map((match, index) => (
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
                  ))
                )}
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
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-slate-400 font-medium">Loading...</p>
                  </div>
                ) : upcomingTournaments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-400 font-medium">No upcoming tournaments. Check back soon!</p>
                  </div>
                ) : (
                  upcomingTournaments.map((tournament, index) => (
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
                  ))
                )}
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
