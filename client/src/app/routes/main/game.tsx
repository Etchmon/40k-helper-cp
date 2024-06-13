import { QueryClient } from "@tanstack/react-query";
// import { ErrorBoundary } from "react-error-boundary";

import {
  useFactions,
  getFactionsQueryOptions,
} from "@/features/prep/api/get-factions";
import { Head } from "@/components/seo/head";

// UNCOMMENT WHEN REACT QUERY IS NEEDED
// import { queryConfig } from "@/lib/react-query";

// This route loads the BattleSettings component that begins a game and sets up the state for the game
// Once BattleSetting is complete, the game will begin and the Game component will be loaded
// User should be able to toggle between settings and game component to alter settings if needed during game

// Temporary loader function
// Change this function to a getPreGameQueryOptions that encompasses all the queries needed for the game
export const gameLoader = (queryClient: QueryClient) => async () => {
  const gameQuery = getFactionsQueryOptions();

  return (
    queryClient.getQueryData(gameQuery.queryKey) ??
    (await queryClient.fetchQuery(gameQuery))
  );
};

export const GameRoute = () => {
  //   const [gameData, setGameData] = useState({
  //     player1: ".",
  //     player2: ".",
  //     misson: ".",
  //     attacker: ".",
  //     defender: ".",
  //     events: [],
  //     score: [0, 0],
  //     winner: ".",
  //   });

  // Button that changes a state which controls which component is displayed, settings or battle

  const factionQuery = useFactions();
  return (
    <>
      <Head title="Game" />
      {/* layout */}
      {console.log(factionQuery.data)}
      <div className="relative items-center h-screen bg-base">
        <h2 className="text-2xl font-bold text-center text-text m-[10vh]">
          Active Component
        </h2>
      </div>
    </>
  );
};
