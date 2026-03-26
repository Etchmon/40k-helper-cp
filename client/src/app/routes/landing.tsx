import { useNavigate } from "react-router";
import { Head } from "@/components/seo/head";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import backgroundImage from "@/assets/40k-battle01.webp";
import { Play, Trophy, Target, Crown, Swords, Zap } from "lucide-react";

export const LandingRoute = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/app/game/setup");
  };

  const features = [
    {
      icon: Target,
      title: "Phase Tracking",
      description: "Navigate through all game phases with clear instructions"
    },
    {
      icon: Trophy,
      title: "Victory Points",
      description: "Track VP for both players throughout the battle"
    },
    {
      icon: Crown,
      title: "Command Points",
      description: "Manage CP spending and generation with ease"
    },
    {
      icon: Swords,
      title: "Stratagems",
      description: "Access faction stratagems quickly during gameplay"
    },
    {
      icon: Zap,
      title: "Unit Selection",
      description: "View unit abilities, weapons, and stats at a tap"
    },
    {
      icon: Play,
      title: "Multiple Sizes",
      description: "Combat Patrol, Incursion, Strike Force & Full Scale"
    }
  ];

  return (
    <>
      <Head 
        title="BattlePad - Warhammer 40k Companion"
        description="Your digital battle companion for Warhammer 40k. Optimized for tablets. Track victory points, manage command points, navigate phases, and execute stratagems for any game size."
      />
      <main>
        <div
          className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundColor: '#0a0a0f'
          }}
          role="banner"
          aria-label="Warhammer 40k battle scene background"
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-crust/90 via-crust/70 to-crust/90" aria-hidden="true" />
          
          <div className="relative z-10 mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-5xl w-full">
            {/* Logo/Title Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-lavender/20 border border-lavender/30 mb-6">
                <Swords className="w-10 h-10 text-lavender" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-4">
                <span className="bg-gradient-to-r from-lavender via-blue to-sky bg-clip-text text-transparent">
                  BattlePad
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-subtext0 max-w-2xl mx-auto">
                Your Tablet Companion for Warhammer 40k
              </p>
            </div>

            {/* Tagline */}
            <div className="text-center mb-10">
              <p className="text-base sm:text-lg text-overlay1 max-w-xl mx-auto">
                Designed for tablets. From Combat Patrol to Full Strike Force. 
                Track VP, manage CP, navigate phases, and execute stratagems with ease.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mb-12">
              <Button 
                onClick={handleStart}
                size="lg"
                className="min-w-[220px] text-lg px-10 py-7 bg-lavender hover:bg-lavender/90 text-crust font-semibold rounded-xl"
              >
                Start Game
              </Button>
            </div>

            {/* Features Grid */}
            <div className="mb-10">
              <h2 className="sr-only">Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <Card key={index} className="bg-surface0/50 border-surface1 hover:border-lavender/30 transition-colors">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-lavender/20 flex items-center justify-center shrink-0">
                        <feature.icon className="w-5 h-5 text-lavender" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text text-sm">{feature.title}</h3>
                        <p className="text-xs text-overlay1 mt-0.5">{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Game Sizes */}
            <div className="text-center">
              <h2 className="text-sm font-medium text-overlay1 mb-4 uppercase tracking-wider">Supported Game Sizes</h2>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {[
                  { label: 'Combat Patrol', size: '~500pts', bg: 'bg-green-500/20', border: 'border-green-500/40', text: 'text-green-400' },
                  { label: 'Incursion', size: '~1000pts', bg: 'bg-sky-500/20', border: 'border-sky-500/40', text: 'text-sky-400' },
                  { label: 'Strike Force', size: '~2000pts', bg: 'bg-lavender/20', border: 'border-lavender/40', text: 'text-lavender' },
                  { label: 'Full Scale', size: '~3000pts', bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', text: 'text-yellow-400' }
                ].map((gameSize, index) => (
                  <div 
                    key={index}
                    className={`px-4 py-2.5 rounded-lg border ${gameSize.bg} ${gameSize.border}`}
                  >
                    <div className={`text-sm font-medium ${gameSize.text}`}>{gameSize.label}</div>
                    <div className={`text-xs ${gameSize.text} opacity-60`}>{gameSize.size}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
