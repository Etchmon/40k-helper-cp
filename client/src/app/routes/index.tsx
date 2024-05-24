// import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";

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
  ]);
