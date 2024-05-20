import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/game");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="landing-header">
          In the grim darkness of the far future there is only war...
        </h1>
      </header>
      <main>
        <Button variant="default" size="default" onClick={startGame}>
          Start Game
        </Button>
      </main>
    </div>
  );
}

export default App;
