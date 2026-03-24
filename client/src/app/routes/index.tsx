import { createBrowserRouter, redirect } from "react-router-dom";
import { AppRoot } from "./main/root";

// protected routes

export const createRouter = () =>
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
          path: "/app/game/setup",
          lazy: async () => {
            const { SetupIndex } = await import("./main/setup");
            return { Component: SetupIndex };
          },
        },
        {
          path: "/app/game/play",
          lazy: async () => {
            const { GameBoard } = await import("./main/play");
            return { Component: GameBoard };
          },
        },
        {
          path: "/app/game/end",
          lazy: async () => {
            const { VictoryScreen } = await import("./main/end/victory-screen");
            return { Component: VictoryScreen };
          },
        },
        {
          path: "/app/game",
          loader: () => redirect("/app/game/setup"),
        },
      ],
    },
  ]);
