import { Trophy, Medal, Award, Crown } from 'lucide-react';

export default function PreviousWinners() {
  const winners = [
    {
      tournament: 'Weekend Warriors Championship',
      date: 'September 28, 2025',
      first: { name: 'ShadowKing', prize: '$250' },
      second: { name: 'DragonSlayer', prize: '$150' },
      third: { name: 'ThunderBolt', prize: '$100' }
    },
    {
      tournament: 'Friday Night Showdown',
      date: 'September 20, 2025',
      first: { name: 'PhoenixRise', prize: '$125' },
      second: { name: 'NightHawk', prize: '$75' },
      third: { name: 'StormBreaker', prize: '$50' }
    },
    {
      tournament: 'Midweek Madness',
      date: 'September 18, 2025',
      first: { name: 'BlazeFury', prize: '$75' },
      second: { name: 'IceViper', prize: '$45' },
      third: { name: 'TitanForce', prize: '$30' }
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 blur-2xl opacity-50"></div>
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-2xl">
              <Crown className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
            Previous Winners
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mb-4"></div>
          <p className="text-xl text-slate-400 font-bold">
            Celebrating our champions and their victories
          </p>
        </div>

        {/* Winners List */}
        <div className="space-y-8">
          {winners.map((winner, index) => (
            <div
              key={index}
              className="relative bg-black/60 backdrop-blur border-2 border-orange-500/30 rounded-2xl p-8 hover:border-orange-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-2xl"></div>

              <div className="relative">
                {/* Tournament Info */}
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight">
                    {winner.tournament}
                  </h2>
                  <p className="text-orange-500 font-bold uppercase text-sm tracking-wide">{winner.date}</p>
                </div>

                {/* Podium */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* First Place */}
                  <div className="relative bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-xl p-6 text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-xl"></div>
                    <div className="relative">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mb-4 shadow-2xl">
                        <Crown className="w-8 h-8 text-white" strokeWidth={2.5} />
                      </div>
                      <div className="text-yellow-400 font-black text-sm uppercase tracking-wider mb-2">1st Place</div>
                      <h3 className="text-2xl font-black text-white mb-2">{winner.first.name}</h3>
                      <p className="text-green-400 font-black text-xl">{winner.first.prize}</p>
                    </div>
                  </div>

                  {/* Second Place */}
                  <div className="relative bg-gradient-to-br from-slate-400/20 to-slate-500/20 border-2 border-slate-400/50 rounded-xl p-6 text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-400/5 to-slate-500/5 rounded-xl"></div>
                    <div className="relative">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full mb-4 shadow-2xl">
                        <Medal className="w-8 h-8 text-white" strokeWidth={2.5} />
                      </div>
                      <div className="text-slate-300 font-black text-sm uppercase tracking-wider mb-2">2nd Place</div>
                      <h3 className="text-2xl font-black text-white mb-2">{winner.second.name}</h3>
                      <p className="text-green-400 font-black text-xl">{winner.second.prize}</p>
                    </div>
                  </div>

                  {/* Third Place */}
                  <div className="relative bg-gradient-to-br from-amber-700/20 to-amber-800/20 border-2 border-amber-700/50 rounded-xl p-6 text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-700/5 to-amber-800/5 rounded-xl"></div>
                    <div className="relative">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-700 to-amber-800 rounded-full mb-4 shadow-2xl">
                        <Award className="w-8 h-8 text-white" strokeWidth={2.5} />
                      </div>
                      <div className="text-amber-600 font-black text-sm uppercase tracking-wider mb-2">3rd Place</div>
                      <h3 className="text-2xl font-black text-white mb-2">{winner.third.name}</h3>
                      <p className="text-green-400 font-black text-xl">{winner.third.prize}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hall of Fame */}
        <div className="mt-16 relative bg-black/60 backdrop-blur border-2 border-orange-500/30 rounded-2xl p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-2xl"></div>
          <div className="relative">
            <Trophy className="w-16 h-16 text-orange-500 mx-auto mb-6" strokeWidth={2.5} />
            <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">Hall of Fame</h2>
            <p className="text-slate-400 font-bold text-lg mb-8">
              The most decorated champions in Micro Tournaments history
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { name: 'ShadowKing', wins: 8, earnings: '$2,100' },
                { name: 'PhoenixRise', wins: 6, earnings: '$1,650' },
                { name: 'DragonSlayer', wins: 5, earnings: '$1,350' }
              ].map((legend, index) => (
                <div key={index} className="bg-black/60 border-2 border-orange-500/30 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-black text-xl">
                    #{index + 1}
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">{legend.name}</h3>
                  <p className="text-orange-400 font-bold text-sm uppercase">{legend.wins} Wins</p>
                  <p className="text-green-400 font-black text-lg">{legend.earnings}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
