import { useNavigate } from "react-router";

import { Head } from "@/components/seo/head";
import { Button } from "@/components/ui/button";
import backgroundImage from "@/assets/40k-battle01.webp";

export const LandingRoute = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (localStorage.getItem("token")) {
      navigate("/app/game");
    } else {
      navigate("/app/game");
    }
  };

  return (
    <>
      <Head 
        title="Home"
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
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/80" aria-hidden="true" />
          
          <div className="relative z-10 mx-auto text-center px-4 py-12 sm:px-6 lg:px-8 lg:py-12 max-w-4xl">
            <h1 className="text-4xl font-extrabold text-slate-50 sm:text-5xl lg:text-6xl tracking-tight mb-6">
              <span className="block mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  BattlePad
                </span>
              </span>
              <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-slate-300 mt-4">
                Your Tablet Companion for Warhammer 40k
              </span>
            </h1>
            
            <div className="mt-6">
              <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
                Designed for tablets. From Combat Patrol to Full Strike Force. Track VP, manage CP, navigate phases, and execute stratagems with ease.
              </p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleStart}
                size="lg"
                className="min-w-[200px] text-lg px-8 py-6"
                aria-label="Start a new Warhammer 40k game"
              >
                Start Game
              </Button>
            </div>
            
            <h2 className="sr-only">Supported Game Sizes</h2>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-slate-300 text-sm">
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl" role="img" aria-label="patrol">⚔️</span>
                <span>Combat Patrol</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl" role="img" aria-label="incursion">🎯</span>
                <span>Incursion</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl" role="img" aria-label="strike force">💥</span>
                <span>Strike Force</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl" role="img" aria-label="full scale">👑</span>
                <span>Full Scale</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
