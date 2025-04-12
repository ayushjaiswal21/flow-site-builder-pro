
import React, { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRole?: "hr" | "candidate" | null;
  showSidebar?: boolean;
}

export function DashboardLayout({
  children,
  requireAuth = true,
  allowedRole = null,
  showSidebar = true,
}: DashboardLayoutProps) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is not authenticated and authentication is required
    if (requireAuth && !isAuthenticated) {
      navigate("/login");
      return;
    }

    // If role-specific access is required and the user's role doesn't match
    if (requireAuth && isAuthenticated && allowedRole && user?.role !== allowedRole) {
      navigate(user?.role === "hr" ? "/hr/dashboard" : "/candidate/dashboard");
    }
  }, [requireAuth, isAuthenticated, allowedRole, user, navigate]);

  // Early return for immediate redirect
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex">
        {showSidebar && isAuthenticated && (
          <Sidebar userRole={user?.role || null} />
        )}
        <main
          className={cn(
            "flex-1 p-4 md:p-6",
            showSidebar ? "lg:ml-64" : ""
          )}
        >
          {children}
        </main>
      </div>
      <Footer className={cn(showSidebar ? "lg:ml-64" : "")} />
    </div>
  );
}
