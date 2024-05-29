import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";
import { AppRoot } from "./main/root";

import { gameLoader } from "./main/game";

// protected routes

export const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const { LandingRoute } = await import("./landing");
        return { Component: LandingRoute };
      },
    },
    {
      path: "/app",
      element: <AppRoot />,
      children: [
        {
          path: "/app/game",
          lazy: async () => {
            const { GameRoute } = await import("./main/game");
            return { Component: GameRoute };
          },
          loader: gameLoader(queryClient),
        },
      ],
    },
  ]);
