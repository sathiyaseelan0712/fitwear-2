import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session on initial load
    const storedUser = localStorage.getItem('fitwear_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, you would call your API here
    // This is a mock implementation
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@fitwear.com' && password === 'admin123') {
          const adminUser = {
            id: '1',
            name: 'Admin',
            email: 'admin@fitwear.com',
            isAdmin: true
          };
          setUser(adminUser);
          localStorage.setItem('fitwear_user', JSON.stringify(adminUser));
          resolve();
        } else if (email && password) {
          const regularUser = {
            id: '2',
            name: 'John Doe',
            email: email
          };
          setUser(regularUser);
          localStorage.setItem('fitwear_user', JSON.stringify(regularUser));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fitwear_user');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
        user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};