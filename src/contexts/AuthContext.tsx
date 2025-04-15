
import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';

export type UserRole = 'hr' | 'candidate' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string | null;
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  loading: false,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const initialized = useRef(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Start as loading
  const isAuthenticated = !!user;

  // Initialize user from localStorage only once
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error reading user from localStorage:', error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  // Update localStorage when user changes
  useEffect(() => {
    if (initialized.current) {
      try {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error updating localStorage:', error);
      }
    }
  }, [user]);

  const login = (userData: User) => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setUser(userData);
      setLoading(false);
    }, 500);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
