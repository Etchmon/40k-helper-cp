import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

export const getFactions = () => {
  return api.get("/game/start");
};

export const getFactionsQueryOptions = () => {
  return queryOptions({
    queryKey: ["factions"],
    queryFn: () => getFactions(),
  });
};

type UseFactionOptions = {
  queryConfig?: QueryConfig<typeof getFactions>;
};

export const useFactions = ({ queryConfig }: UseFactionOptions = {}) => {
  return useQuery({
    ...getFactionsQueryOptions(),
    ...queryConfig,
  });
};
