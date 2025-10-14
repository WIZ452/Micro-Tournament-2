import { ChevronRight, Zap, Trophy, Users, Gamepad2 } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface HeroProps {
  onRegister: () => void;
  onViewTournaments: () => void;
}

export default function Hero({ onRegister, onViewTournaments }: HeroProps) {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();

  return (
    <div className="relative overflow-hidden">
      {/* Animated background elements - darker */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-3xl"></div>
      </div>

      <div
        ref={heroRef}
        className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 transition-all duration-1000 ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center">
          {/* Gaming controller icon */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 blur-2xl opacity-50 animate-pulse"></div>
            <Gamepad2 className="relative w-20 h-20 text-orange-500 mx-auto" strokeWidth={2.5} />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-600/20 border-2 border-orange-500/50 rounded-full px-6 py-3 mb-8 shadow-lg shadow-orange-500/20">
            <Zap className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 text-sm font-black uppercase tracking-wider">Fast-Paced Competitive Gaming</span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none tracking-tighter">
            <span className="block text-white drop-shadow-[0_0_30px_rgba(249,115,22,0.3)]" style={{
              WebkitTextStroke: '2px rgba(249,115,22,0.2)',
              paintOrder: 'stroke fill'
            }}>
              MICRO
            </span>
            <span className="block bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent drop-shadow-2xl">
              TOURNAMENTS
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-bold uppercase tracking-wide">
            Where Legends Are Born
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button
              onClick={onRegister}
              className="group relative px-10 py-5 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white rounded-xl font-black text-xl shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-300 hover:scale-110 flex items-center space-x-3 uppercase tracking-wide border-2 border-orange-400/50"
            >
              <span>Join Now</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <button
              onClick={onViewTournaments}
              className="px-10 py-5 bg-black/80 border-2 border-orange-500/50 text-white rounded-xl font-black text-xl hover:bg-slate-800 hover:border-orange-500/70 transition-all duration-300 hover:scale-105 uppercase tracking-wide shadow-xl"
            >
              Ongoing Tournaments
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20">
            {[
              { icon: Users, label: 'Active Players', value: '2,500+', color: 'orange' },
              { icon: Trophy, label: 'Tournaments', value: '150+', color: 'red' },
              { icon: Zap, label: 'Avg Duration', value: '30min', color: 'orange' }
            ].map((stat, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-black/80 border-2 border-orange-500/30 rounded-2xl p-6 backdrop-blur group-hover:border-orange-500/60 transition-all">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl mb-3 shadow-lg">
                    <stat.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
