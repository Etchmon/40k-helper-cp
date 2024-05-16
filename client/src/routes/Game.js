import React, { useState, useEffect } from "react";

function Game() {
  const [component, setComponent] = useState(null);
  const [gameData, setGameData] = useState({
    player1: ".",
    player2: ".",
    misson: ".",
    attacker: ".",
    defender: ".",
    events: [],
    score: [0, 0],
    winner: ".",
  });

  useEffect(() => {
    startGame();
  }, []);

  async function startGame() {
    const response = await fetch("http://localhost:5000/api/game/start", {
      method: "POST",
    });
    const data = await response.json();
    console.log(data);
    // Use data to display factions to choose from
    showComponent(data.nextComponent);
  }

  async function getNextComponent() {
    const response = await fetch("/api/game/next", { method: "GET" });
    const data = await response.json();
    showComponent(data.nextComponent);
  }

  async function getGameData() {
    // Create dynamic routes for getting game data, set up unique game id's that can be used to retrieve data about past games
    const response = await fetch("/api/game/data", { method: "GET" });
    const data = await response.json();
    setGameData(data);
  }

  function showComponent(componentName) {
    switch (componentName) {
      case "Component1":
        setComponent();
        break;
      case "Component2":
        setComponent();
        break;
      case "Component3":
        setComponent();
        break;
      default:
        setComponent(<div>Unknown component: {componentName}</div>);
    }
  }

  return (
    <div>
      {component}
      {/* Display game data here */}
    </div>
  );
}

export default Game;
