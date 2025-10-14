import { useState } from 'react';
import { Calendar, Clock, Trophy, Users, DollarSign, Shield, Zap, Award, X, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function TournamentInfo() {
  const { isAuthenticated, user } = useAuth();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<any>(null);
  const [joinSuccess, setJoinSuccess] = useState(false);

  const handleJoinClick = (tournament: any) => {
    if (!isAuthenticated) {
      alert('Please login or register to join tournaments');
      return;
    }
    setSelectedTournament(tournament);
    setShowJoinModal(true);
  };

  const handleConfirmJoin = () => {
    setJoinSuccess(true);
    setTimeout(() => {
      setShowJoinModal(false);
      setJoinSuccess(false);
      setSelectedTournament(null);
    }, 2000);
  };
  const upcomingTournaments = [
    {
      title: 'Weekend Warriors Championship',
      date: 'Saturday, Oct 5, 2025',
      time: '2:00 PM EST',
      prize: '$500',
      slots: '16/32',
      game: 'Multi-Game'
    },
    {
      title: 'Friday Night Showdown',
      date: 'Friday, Oct 4, 2025',
      time: '8:00 PM EST',
      prize: '$250',
      slots: '24/32',
      game: 'Featured Title'
    },
    {
      title: 'Midweek Quick Match',
      date: 'Wednesday, Oct 9, 2025',
      time: '6:00 PM EST',
      prize: '$150',
      slots: '8/16',
      game: 'Speed Round'
    }
  ];

  const rules = [
    { icon: Users, title: 'Eligibility', description: 'Open to all skill levels. Age 13+ required.' },
    { icon: Clock, title: 'Format', description: 'Single elimination, best of 3 matches.' },
    { icon: Shield, title: 'Fair Play', description: 'Strict anti-cheat policy enforced.' },
    { icon: Trophy, title: 'Prizes', description: 'Top 3 finishers receive cash prizes.' }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 blur-2xl opacity-50"></div>
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-2xl">
              <Calendar className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
            Tournament Info
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mb-4"></div>
          <p className="text-xl text-slate-400 font-bold">
            Everything you need to know about our competitions
          </p>
        </div>

        {/* Upcoming Tournaments */}
        <div className="mb-16">
          <h2 className="text-4xl font-black text-white mb-8 flex items-center uppercase tracking-tight">
            <Zap className="w-8 h-8 text-orange-500 mr-3" strokeWidth={2.5} />
            Upcoming Tournaments
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTournaments.map((tournament, index) => (
              <div
                key={index}
                className="relative bg-black/60 backdrop-blur border-2 border-orange-500/30 rounded-2xl p-6 hover:border-orange-500/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-2xl"></div>
                <div className="relative">
                  <h3 className="text-xl font-black text-white mb-4 uppercase">{tournament.title}</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-slate-300">
                      <Calendar className="w-4 h-4 mr-3 text-orange-400" />
                      <span className="text-sm font-medium">{tournament.date}</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                      <Clock className="w-4 h-4 mr-3 text-orange-400" />
                      <span className="text-sm font-medium">{tournament.time}</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                      <DollarSign className="w-4 h-4 mr-3 text-green-400" />
                      <span className="text-sm font-bold text-green-400">{tournament.prize} Prize Pool</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                      <Users className="w-4 h-4 mr-3 text-orange-400" />
                      <span className="text-sm font-medium">{tournament.slots} Registered</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleJoinClick(tournament)}
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-black uppercase tracking-wide hover:shadow-xl hover:shadow-orange-500/50 transition-all duration-200 border-2 border-orange-400/50 hover:scale-105"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Tournament Modal */}
        {showJoinModal && selectedTournament && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative bg-slate-900/95 border-2 border-orange-500/50 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl shadow-orange-500/20">
              {!joinSuccess ? (
                <>
                  {/* Close Button */}
                  <button
                    onClick={() => setShowJoinModal(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mb-4">
                      <Trophy className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase mb-2">Join Tournament</h2>
                    <p className="text-slate-400 font-bold">{selectedTournament.title}</p>
                  </div>

                  {/* Tournament Details */}
                  <div className="space-y-3 mb-6 bg-black/40 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-bold text-sm">Date:</span>
                      <span className="text-white font-black">{selectedTournament.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-bold text-sm">Time:</span>
                      <span className="text-white font-black">{selectedTournament.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-bold text-sm">Prize Pool:</span>
                      <span className="text-green-400 font-black">{selectedTournament.prize}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-bold text-sm">Slots:</span>
                      <span className="text-orange-400 font-black">{selectedTournament.slots}</span>
                    </div>
                    {user && (
                      <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                        <span className="text-slate-400 font-bold text-sm">Playing as:</span>
                        <span className="text-orange-500 font-black">{user.gamertag}</span>
                      </div>
                    )}
                  </div>

                  {/* Confirm Button */}
                  <button
                    onClick={handleConfirmJoin}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-black text-lg uppercase tracking-wide hover:shadow-xl hover:shadow-orange-500/50 transition-all duration-200 border-2 border-orange-400/50"
                  >
                    Confirm Registration
                  </button>
                  <button
                    onClick={() => setShowJoinModal(false)}
                    className="w-full py-3 mt-3 bg-slate-800/50 border-2 border-slate-700 text-slate-300 rounded-xl font-bold uppercase hover:bg-slate-700 transition-all"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4 animate-pulse">
                    <CheckCircle className="w-12 h-12 text-green-400" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase mb-2">Success!</h3>
                  <p className="text-slate-400 font-bold">You're registered for the tournament</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tournament Rules */}
        <div className="mb-16">
          <h2 className="text-4xl font-black text-white mb-8 flex items-center uppercase tracking-tight">
            <Shield className="w-8 h-8 text-orange-500 mr-3" strokeWidth={2.5} />
            Tournament Rules
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {rules.map((rule, index) => (
              <div
                key={index}
                className="relative bg-black/60 backdrop-blur border-2 border-orange-500/30 rounded-2xl p-6 hover:border-orange-500/60 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-2xl"></div>
                <div className="relative flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                      <rule.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-2 uppercase">{rule.title}</h3>
                    <p className="text-slate-400 font-medium">{rule.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prize Distribution */}
        <div className="relative bg-black/60 backdrop-blur border-2 border-orange-500/30 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-2xl"></div>
          <div className="relative text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4 shadow-xl">
              <Award className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">Prize Distribution</h2>
            <p className="text-slate-400 font-bold">Standard tournament payout structure</p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-6">
            {[
              { place: '1st Place', percentage: '50%', color: 'from-yellow-500 to-orange-500' },
              { place: '2nd Place', percentage: '30%', color: 'from-slate-400 to-slate-500' },
              { place: '3rd Place', percentage: '20%', color: 'from-amber-600 to-amber-700' }
            ].map((prize, index) => (
              <div
                key={index}
                className="bg-black/80 rounded-xl p-6 text-center border-2 border-slate-700 hover:border-orange-500/50 transition-all"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${prize.color} rounded-full mb-4 shadow-xl`}>
                  <Trophy className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-black text-white mb-2 uppercase">{prize.place}</h3>
                <p className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  {prize.percentage}
                </p>
                <p className="text-sm text-slate-400 mt-2 font-bold uppercase tracking-wide">of prize pool</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Support */}
        <div className="mt-12 text-center relative bg-black/60 backdrop-blur border-2 border-orange-500/30 rounded-2xl p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-2xl"></div>
          <div className="relative">
            <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-tight">Need Help?</h3>
            <p className="text-slate-400 mb-6 font-bold">
              Our support team is available 24/7 to assist with any questions
            </p>
            <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-black uppercase tracking-wide hover:shadow-xl hover:shadow-orange-500/50 transition-all duration-200 border-2 border-orange-400/50">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
