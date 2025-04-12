
import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
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

  // Check if user is authenticated if required
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check if user has correct role if specified
  if (
    requireAuth &&
    isAuthenticated &&
    allowedRole &&
    user?.role !== allowedRole
  ) {
    return <Navigate to={`/${user?.role}/dashboard`} />;
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
