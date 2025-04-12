
import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "hr" | "candidate" | null;

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("skillprove-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    setLoading(true);
    
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, we would validate credentials with a backend
    // For demo purposes, we'll just create a mock user
    const mockUser = {
      id: "user-" + Math.random().toString(36).substring(2, 9),
      name: role === "hr" ? "HR Manager" : "Test Candidate",
      email: email,
      role: role
    };
    
    setUser(mockUser);
    localStorage.setItem("skillprove-user", JSON.stringify(mockUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("skillprove-user");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
