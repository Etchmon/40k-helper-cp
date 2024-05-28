import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";

export const LandingRoute = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (localStorage.getItem("token")) {
      navigate("/game");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="App min-h-screen bg-gray-700 text-stone-50">
      <header className="App-header">
        <h1 className="landing-header">
          In the grim darkness of the far future there is only war...
        </h1>
      </header>
      <main>
        <Button variant="default" size="default" onClick={handleStart}>
          Start Game
        </Button>
      </main>
    </div>
  );
};
