
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className={cn("border-b bg-white", className)}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2">
            <div className="text-primary text-2xl font-bold">SkillProve</div>
          </a>
          {isAuthenticated && (
            <nav className="hidden md:flex gap-6 ml-6">
              {user?.role === "hr" ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center text-muted-foreground hover:text-foreground">
                      Product <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem onClick={() => navigate("/hr/dashboard")}>Dashboard</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/hr/create-test")}>Create Test</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/hr/monitor-tests")}>Monitor Tests</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <span 
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                    onClick={() => navigate("/hr/reports")}
                  >
                    Reports
                  </span>
                </>
              ) : (
                <>
                  <span 
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                    onClick={() => navigate("/candidate/dashboard")}
                  >
                    Dashboard
                  </span>
                  <span 
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                    onClick={() => navigate("/candidate/results")}
                  >
                    Results
                  </span>
                </>
              )}
              <a href="#resources" className="text-muted-foreground hover:text-foreground">Resources</a>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="hidden md:inline text-sm text-muted-foreground">
                {user?.name}
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={logout} 
                title="Log out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline" onClick={() => navigate("/login")}>
                Log in
              </Button>
              <Button onClick={() => navigate("/login")}>Try for free</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
