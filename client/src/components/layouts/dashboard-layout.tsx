import { useState } from "react";
import { NavLink } from "react-router-dom";

import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

type SideNavigationItem = {
  name: string;
  to: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const navigation = [{ name: "Landing", to: "/", icon: Home }].filter(
    Boolean
  ) as SideNavigationItem[];
  return (
    <div className="flex min-h-screen w-full">
      <Button
        className="fixed px-4 py-2 text-white right-5 top-5 z-10"
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
          <div className="flex h-16 shrink-0 items-center px-4">logo</div>
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex items-center h-14 px-4 text-lg"
            >
              <item.icon className="w-6 h-6 mr-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        {children}
      </main>
    </div>
  );
}
