import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";

import { AppProvider } from "./main-provider";
import { GameProvider } from "@/lib/game/store";
import { ToastProvider } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { createRouter } from "./routes";

const AppRouter = () => {
  const router = useMemo(() => createRouter(), []);

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <GameProvider>
          <AppRouter />
          <ConfirmDialog />
        </GameProvider>
      </ToastProvider>
    </AppProvider>
  );
}

export default App;
