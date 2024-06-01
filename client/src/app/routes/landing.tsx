import { useNavigate } from "react-router";

import { Head } from "@/components/seo/head";
import { Button } from "@/components/ui/button";
import backgroundImage from "@/assets/40k-battle01.jpg";

export const LandingRoute = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (localStorage.getItem("token")) {
      navigate("/app/game");
    } else {
      // navigate("/");
      // uncomment when localstorage token or jwt is implemented
      navigate("/app/game");
    }
  };

  return (
    <>
      <Head title="Landing" />
      <div
        className="relative flex items-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 opacity-50 bg-slate-950"></div>
        <div className="mx-auto text-center px-4 py-12 sm:px-6 lg:px-8 lg:py-12 z-10">
          <h2 className="text-3xl font-extrabold text-slate-50 sm:text-4xl">
            <span className="block">
              Warhammer 40k Combat Patrol Digital Interface
            </span>
            <Button onClick={handleStart}>Start</Button>
          </h2>
        </div>
      </div>
    </>
  );
};
