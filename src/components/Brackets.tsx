import { useState } from 'react';
import { Swords, Trophy, Clock, CheckCircle2, Circle } from 'lucide-react';

export default function Brackets() {
  const [selectedTournament, setSelectedTournament] = useState('current');

  // Mock data
  const tournaments = [
    { id: 'current', name: 'Weekend Warriors', status: 'live', players: 16 },
    { id: 'upcoming', name: 'Friday Night Fight', status: 'upcoming', players: 12 },
    { id: 'past', name: 'Midweek Madness', status: 'completed', players: 16 }
  ];

  const matches = [
    { id: 1, round: 'Round of 16', player1: 'ShadowKing', player2: 'ThunderBolt', score1: 2, score2: 1, status: 'completed' },
    { id: 2, round: 'Round of 16', player1: 'DragonSlayer', player2: 'PhoenixRise', score1: 2, score2: 0, status: 'completed' },
    { id: 3, round: 'Quarter Finals', player1: 'ShadowKing', player2: 'DragonSlayer', score1: null, score2: null, status: 'upcoming' },
    { id: 4, round: 'Round of 16', player1: 'NightHawk', player2: 'StormBreaker', score1: 1, score2: 1, status: 'live' },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 blur-2xl opacity-50"></div>
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-2xl">
              <Swords className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
            Tournament Brackets
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mb-4"></div>
          <p className="text-xl text-slate-400 font-bold">
            Track matches and report results in real-time
          </p>
        </div>

        {/* Tournament Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tournaments.map((tournament) => (
            <button
              key={tournament.id}
              onClick={() => setSelectedTournament(tournament.id)}
              className={`px-6 py-3 rounded-xl font-bold uppercase text-sm tracking-wide transition-all duration-200 ${
                selectedTournament === tournament.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white border-2 border-orange-400/50 shadow-xl shadow-orange-500/50 scale-105'
                  : 'bg-black/60 text-slate-300 border-2 border-slate-700/50 hover:border-orange-500/50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>{tournament.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-black uppercase ${
                  tournament.status === 'live' ? 'bg-green-500/30 text-green-300 border border-green-500/50' :
                  tournament.status === 'upcoming' ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50' :
                  'bg-slate-500/30 text-slate-300 border border-slate-500/50'
                }`}>
                  {tournament.status}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Matches Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {matches.map((match) => (
            <div
              key={match.id}
              className="relative bg-black/60 backdrop-blur border-2 border-orange-500/30 rounded-2xl p-6 hover:border-orange-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-2xl"></div>
              {/* Round Badge */}
              <div className="relative flex items-center justify-between mb-6">
                <span className="text-sm font-black text-orange-400 bg-gradient-to-r from-orange-500/20 to-red-600/20 border border-orange-500/50 px-4 py-1.5 rounded-full uppercase tracking-wide">
                  {match.round}
                </span>
                <div className="flex items-center space-x-2">
                  {match.status === 'live' && (
                    <>
                      <Clock className="w-4 h-4 text-green-400 animate-pulse" />
                      <span className="text-sm text-green-400 font-bold uppercase">Live</span>
                    </>
                  )}
                  {match.status === 'completed' && (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-400 font-bold uppercase">Completed</span>
                    </>
                  )}
                  {match.status === 'upcoming' && (
                    <>
                      <Circle className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-blue-400 font-bold uppercase">Upcoming</span>
                    </>
                  )}
                </div>
              </div>

              {/* Players */}
              <div className="relative space-y-4">
                {/* Player 1 */}
                <div className={`flex items-center justify-between p-4 rounded-xl border-2 ${
                  match.score1 !== null && match.score1 > (match.score2 || 0)
                    ? 'bg-gradient-to-r from-orange-500/20 to-red-600/20 border-orange-500/50 shadow-lg shadow-orange-500/20'
                    : 'bg-black/80 border-slate-700/50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-lg">
                      {match.player1.charAt(0)}
                    </div>
                    <span className="text-white font-bold">{match.player1}</span>
                  </div>
                  {match.score1 !== null && (
                    <span className="text-3xl font-black text-white">{match.score1}</span>
                  )}
                </div>

                {/* VS Divider */}
                <div className="flex items-center justify-center">
                  <span className="text-orange-500 font-black text-lg uppercase tracking-wider">VS</span>
                </div>

                {/* Player 2 */}
                <div className={`flex items-center justify-between p-4 rounded-xl border-2 ${
                  match.score2 !== null && match.score2 > (match.score1 || 0)
                    ? 'bg-gradient-to-r from-orange-500/20 to-red-600/20 border-orange-500/50 shadow-lg shadow-orange-500/20'
                    : 'bg-black/80 border-slate-700/50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-lg">
                      {match.player2.charAt(0)}
                    </div>
                    <span className="text-white font-bold">{match.player2}</span>
                  </div>
                  {match.score2 !== null && (
                    <span className="text-3xl font-black text-white">{match.score2}</span>
                  )}
                </div>
              </div>

              {/* Report Score Button */}
              {match.status === 'live' && (
                <button className="relative w-full mt-4 py-3 bg-gradient-to-r from-orange-500/20 to-red-600/20 border-2 border-orange-500/50 text-orange-400 rounded-xl font-black uppercase tracking-wide hover:from-orange-500/30 hover:to-red-600/30 hover:border-orange-500/70 transition-all duration-200 shadow-lg hover:shadow-orange-500/30">
                  Report Score
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Bracket View Coming Soon */}
        <div className="relative mt-12 bg-black/60 backdrop-blur border-2 border-orange-500/30 rounded-2xl p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-2xl"></div>
          <div className="relative">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6 shadow-2xl">
              <Trophy className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-tight">
              Full Bracket View
            </h3>
            <p className="text-slate-400 font-bold">
              Interactive tournament bracket visualization coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
