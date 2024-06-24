import { QueryClient } from "@tanstack/react-query";
// import { ErrorBoundary } from "react-error-boundary";

import {
  useFactions,
  getFactionsQueryOptions,
} from "@/features/prep/api/get-factions";
import { Head } from "@/components/seo/head";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { BattleSettings } from "@/features/prep/components/prep-game";
import { Battle } from "@/features/battle/components/battle";

// UNCOMMENT WHEN REACT QUERY IS NEEDED
// import { queryConfig } from "@/lib/react-query";

// This route loads the BattleSettings component that begins a game and sets up the state for the game
// Once BattleSetting is complete, the game will begin and the Game component will be loaded
// User should be able to toggle between settings and game component to alter settings if needed during game

// Temporary loader function
// Change this function to a getPreGameQueryOptions that encompasses all the queries needed for the game
export const gameLoader = (queryClient: QueryClient) => async () => {
  // This should not run until the user has selected both their factions
  const gameQuery = getFactionsQueryOptions(player1, player2);

  return (
    queryClient.getQueryData(gameQuery.queryKey) ??
    (await queryClient.fetchQuery(gameQuery))
  );
};

export const GameRoute = () => {
  const [gameData, setGameData] = useState({
    player1: "",
    player2: "",
    misson: ".",
    attacker: ".",
    defender: ".",
    events: [],
    score: [0, 0],
    winner: ".",
  });

  // Button that changes a state which controls which component is displayed, settings or battle
  const [gameToggle, setGameToggle] = useState<boolean>(false);
  const factionQuery = useFactions(player1, player2);
  return (
    <>
      <Head title="Game" />
      {/* layout */}
      {(console.log(factionQuery.data), console.log(gameData))}
      <div className="relative items-center h-screen bg-base">
        <Button
          className="absolute top-5 right-5"
          onClick={() => setGameToggle(!gameToggle)}
        />
        <h2 className="text-2xl font-bold text-center text-text m-[10vh]">
          Active Component
        </h2>
        {gameToggle ? <BattleSettings /> : <Battle />}
        {/* Map through factions and list them all, let user click on faction name/image to select and set that faction to the player1/player2  */}
      </div>
    </>
  );
};
