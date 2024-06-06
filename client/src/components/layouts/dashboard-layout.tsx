import { useState } from "react";

import { Button } from "@/components/ui/button";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  return (
    <div className="flex min-h-screen w-full">
      <Button
        className="fixed px-4 py-2 text-white right-0 z-10"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        menu
      </Button>
      <aside
        className={`fixed inset-y-0 left-0 z-10 transform transition-transform duration-200 ease-in-out ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        } w-60 flex-col border-r border-lavender text-text hover:text-blue bg-crust sm:flex`}
      >
        <nav>
          <div>logo</div>
          <div>links</div>
        </nav>
      </aside>
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        {children}
      </main>
    </div>
  );
}
