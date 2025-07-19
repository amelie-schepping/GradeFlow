import { Home, Info, Users, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Layout({ children }) {
  const location = useLocation();

  const routes = [
    {
      title: "Navigation",
      links: [
        { title: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
        { title: "About", href: "/about", icon: <Info className="h-4 w-4" /> },
      ],
    },
    {
      title: "System",
      links: [
        {
          title: "Einstellungen",
          href: "/settings",
          icon: <Settings className="h-4 w-4" />,
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen w-full ">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-gray-50 rounded-2xl">
        <div className="flex h-14 items-center px-4 text-xl font-bold">
          GradeFlow
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
          {routes.map((section) => (
            <div key={section.title}>
              <h4 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {section.title}
              </h4>
              <div className="space-y-1">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition",
                      location.pathname === link.href &&
                        "bg-muted text-foreground",
                      "focus:outline-none focus-visible:outline-none focus-visible:ring-0 ring-0"
                    )}
                    tabIndex={0} // optional: erzwingt Fokus-Handling
                  >
                    {link.icon}
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
