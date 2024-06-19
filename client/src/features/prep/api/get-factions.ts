import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

// Modify this query so it fetches a complex sql query that returns all the necessary data for the game using the factions that the users have selected

export const getFactions = (faction1: string, faction2: string) => {
  return api.get("/game/start", {
    params: {
      faction1,
      faction2,
    },
  });
};

export const getFactionsQueryOptions = (faction1: string, faction2: string) => {
  return queryOptions({
    queryKey: ["factions", faction1, faction2],
    queryFn: () => getFactions(faction1, faction2),
  });
};

type UseFactionOptions = {
  faction1: string;
  faction2: string;
  queryConfig?: QueryConfig<typeof getFactions>;
};

export const useFactions = ({
  faction1,
  faction2,
  queryConfig,
}: UseFactionOptions) => {
  return useQuery({
    ...getFactionsQueryOptions(faction1, faction2),
    ...queryConfig,
  });
};
