import { Trophy, Clock, Shield, Zap, Users, Target } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Features() {
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation();
  const features = [
    {
      icon: Zap,
      title: 'Quick Matches',
      description: 'Fast-paced tournaments designed to fit your schedule. Most matches complete in under 30 minutes.',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: Trophy,
      title: 'Real Prizes',
      description: 'Compete for actual rewards and recognition. Top performers get featured on our leaderboards.',
      gradient: 'from-red-500 to-orange-600'
    },
    {
      icon: Users,
      title: 'Skill Matching',
      description: 'Our advanced algorithm pairs you with players of similar skill levels for fair competition.',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: Target,
      title: 'Live Brackets',
      description: 'Track your progress in real-time with our interactive bracket system and match updates.',
      gradient: 'from-red-500 to-orange-600'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'New tournaments start every hour. Join whenever you want and play at your own pace.',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: Shield,
      title: 'Fair Play',
      description: 'Strict anti-cheat measures and dedicated moderation ensure a level playing field for all.',
      gradient: 'from-red-500 to-orange-600'
    }
  ];

  return (
    <div
      ref={featuresRef}
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 transition-all duration-1000 ${
        featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
          Why Choose MTT?
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mb-4"></div>
        <p className="text-xl text-slate-400 font-bold">
          Everything you need for competitive gaming in one place
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative bg-black/60 backdrop-blur border-2 border-orange-500/30 rounded-2xl p-8 hover:border-orange-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2"
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Icon */}
            <div className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <feature.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>

            {/* Content */}
            <h3 className="relative text-2xl font-black text-white mb-3 uppercase tracking-wide">
              {feature.title}
            </h3>
            <p className="relative text-slate-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
