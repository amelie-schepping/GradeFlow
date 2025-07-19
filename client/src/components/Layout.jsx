import { Home, Info, Settings, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function Layout({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const routes = [
    {
      title: "Navigation",
      links: [
        {
          title: "Meine Klassen",
          href: "/",
          icon: <Home className="h-4 w-4" />,
        },
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

  const Sidebar = (
    <div className="flex h-full flex-col bg-muted/40 w-64">
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
                      "bg-muted text-foreground"
                  )}>
                  {link.icon}
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full">
      {/* Mobile sidebar trigger */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute top-4 left-4 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 w-64 border-r shadow-lg bg-white">
          {Sidebar}
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex bg-white  shadow-sm rounded-2xl">
        {Sidebar}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 pt-16 md:pt-6">{children}</main>
    </div>
  );
}
