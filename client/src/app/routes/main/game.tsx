import { QueryClient } from "@tanstack/react-query";
// import { ErrorBoundary } from "react-error-boundary";

import {
  useFactions,
  getFactionsQueryOptions,
} from "@/features/prep/api/get-factions";
// import { queryConfig } from "@/lib/react-query";

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

  const factionQuery = useFactions();
  return (
    <>
      {/* Head */}
      {/* layout */}
      {console.log(factionQuery.data)}
    </>
  );
};
