import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

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
        <button className="start" onClick={startGame}>
          New Game
        </button>
      </header>
    </div>
  );
}

export default App;
