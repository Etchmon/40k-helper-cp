import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Game from "./routes/Game";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]);
