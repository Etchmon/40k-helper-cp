import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useLocation } from "react-router-dom";

export const AppRoot = () => {
  const location = useLocation();
  return (
    <main>
      <Suspense
        fallback={
          <div className="h-screen w-screen flex items-center justify-center">
            <div className="loader"></div>
          </div>
        }
      >
        <ErrorBoundary
          key={location.pathname}
          fallback={<div>Something went wrong</div>}
        >
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    </main>
  );
};
