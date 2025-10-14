import { Trophy, Users, Target, Award, MessageCircle, Bell } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 blur-3xl opacity-50 animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl shadow-2xl">
              <Trophy className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
            About <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Micro Tournaments</span>
          </h1>
          <div className="w-32 h-1.5 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mb-6"></div>
        </div>

        <div
          ref={contentRef}
          className={`transition-all duration-1000 delay-200 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative bg-black/60 backdrop-blur border-2 border-orange-500/30 rounded-3xl p-8 md:p-12 mb-12 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-3xl"></div>

            <div className="relative space-y-8 text-slate-300 leading-relaxed">
              <div className="border-l-4 border-orange-500 pl-6">
                <h2 className="text-3xl font-black text-white mb-4 uppercase">👋 Greetings!</h2>
                <p className="text-lg font-medium">
                  I am <span className="text-orange-500 font-black">Sekiro Shen</span>, Creator of this organisation.
                </p>
              </div>

              <div className="border-l-4 border-orange-500/50 pl-6">
                <p className="text-lg font-medium">
                  <span className="text-orange-500 font-black">Micro Tournaments</span> is a place of ultimate battleground for competitive gamers!
                  Whether you're here to compete, watch, or just hang out, you\'re part of an awesome community that loves gaming, fair play, and high-level tournament action. 🎮
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-2xl p-8 border border-orange-500/20">
                <h2 className="text-3xl font-black text-white mb-6 uppercase flex items-center gap-3">
                  <Target className="w-8 h-8 text-orange-500" />
                  What We Do
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🏆</span>
                    <p className="text-lg font-medium flex-1">
                      Host regular gaming tournaments (Brawl Stars and more to come!)
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📊</span>
                    <p className="text-lg font-medium flex-1">
                      Provide real-time brackets, score updates, and match coordination
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🎁</span>
                    <p className="text-lg font-medium flex-1">
                      Offer prizes, shoutouts, and server-wide recognition for top players
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🤝</span>
                    <p className="text-lg font-medium flex-1">
                      Create a friendly and competitive environment for players of all skill levels
                    </p>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 rounded-2xl p-8 border border-orange-500/20">
                <h2 className="text-3xl font-black text-white mb-6 uppercase flex items-center gap-3">
                  <Users className="w-8 h-8 text-orange-500" />
                  Who Can Join?
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🎯</span>
                    <p className="text-lg font-medium flex-1">
                      <span className="text-orange-500 font-bold">Anyone!</span> Whether you're a solo player or a team, you're welcome to jump in and compete
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📹</span>
                    <p className="text-lg font-medium flex-1">
                      Streamers, casters, and content creators are also welcome to get involved
                    </p>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-orange-500/10 to-red-600/10 rounded-2xl p-8 border-2 border-orange-500/30">
                <h2 className="text-3xl font-black text-white mb-6 uppercase flex items-center gap-3">
                  <Bell className="w-8 h-8 text-orange-500" />
                  Stay Updated
                </h2>
                <p className="text-lg font-medium mb-4">Check these channels regularly:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-xl">📢</span>
                    <p className="text-lg font-medium flex-1">
                      <span className="text-orange-500 font-bold">#announcement</span> for upcoming tournaments
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">📋</span>
                    <p className="text-lg font-medium flex-1">
                      <span className="text-orange-500 font-bold">#server-rules</span> before participating
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">🎮</span>
                    <p className="text-lg font-medium flex-1">
                      <span className="text-orange-500 font-bold">#tournaments</span> to register
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">📖</span>
                    <p className="text-lg font-medium flex-1">
                      <span className="text-orange-500 font-bold">#tournament-rules</span> for event-specific info
                    </p>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 rounded-2xl p-8 border border-orange-500/20">
                <h2 className="text-3xl font-black text-white mb-6 uppercase flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-orange-500" />
                  Need Help?
                </h2>
                <p className="text-lg font-medium">
                  Got a question or suggestion? 💭 Reach out to a <span className="text-orange-500 font-bold">Moderator</span> or post in the <span className="text-orange-500 font-bold">Help and Support</span> channel, or you can reach out to me directly!
                </p>
              </div>

              <div className="text-center py-8">
                <div className="inline-block bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 shadow-2xl">
                  <p className="text-2xl md:text-3xl font-black text-white uppercase tracking-wide">
                    Welcome to the community—let the games begin! 🚀🔥
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
