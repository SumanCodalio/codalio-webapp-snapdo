import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { CheckSquare, LayoutDashboard, LogIn, Menu, Search, Settings, Sparkles, UserPlus, LogOut, Shield } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@rhino-dev/rhino-react";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await auth?.logout?.();
    navigate("/login");
  };

  const navItems = auth?.isAuthenticated
    ? [
        { label: "Today", route: "/", icon: CheckSquare },
        { label: "Onboarding", route: "/onboarding", icon: Sparkles },
        { label: "Dashboard", route: "/dashboard", icon: LayoutDashboard },
        { label: "Admin Analytics", route: "/admin/analytics", icon: Shield },
      ]
    : [
        { label: "Sign in", route: "/login", icon: LogIn },
        { label: "Sign up", route: "/signup", icon: UserPlus },
      ];

  return (
    <SidebarProvider>
      <Sidebar className="hidden md:flex">
        <SidebarContent>
          <div className="flex h-14 items-center gap-2 px-4 text-lg font-semibold text-foreground">
            <span className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground">
              <CheckSquare className="size-4" />
            </span>
            Snap
          </div>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map(({ label, route, icon: Icon }) => (
                  <SidebarMenuItem key={route}>
                    <SidebarMenuButton asChild>
                      <NavLink to={route} end={route === "/"} className="text-foreground">
                        <Icon className="size-4" />
                        <span>{label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {auth?.isAuthenticated && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/settings">
                          <Settings className="size-4" />
                          <span>Settings</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton onClick={handleSignOut} className="text-destructive">
                        <LogOut className="size-4" />
                        <span>Sign Out</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-border/70 bg-background/90 px-4 backdrop-blur">
          <SidebarTrigger className="hidden md:inline-flex" />
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-popover text-popover-foreground">
              <div className="mb-6 text-lg font-semibold">Snap</div>
              <nav className="grid gap-1">
                {navItems.map(({ label, route, icon: Icon }) => (
                  <NavLink
                    key={route}
                    to={route}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                  >
                    <Icon className="size-4" />
                    {label}
                  </NavLink>
                ))}
                {auth?.isAuthenticated && (
                  <>
                    <NavLink
                      to="/settings"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                    >
                      <Settings className="size-4" />
                      Settings
                    </NavLink>
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-accent text-left"
                    >
                      <LogOut className="size-4" />
                      Sign Out
                    </button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">Snap</p>
          </div>
          <div className="relative hidden w-56 sm:block">
            <Search className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tasks" className="h-9 pl-9" />
          </div>
        </header>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
