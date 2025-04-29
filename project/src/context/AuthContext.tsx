import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage (simulating JWT persistence)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This would be replaced with an actual API call to your Flask backend
      // For now, we'll simulate a successful login with mock data
      if (email === 'admin@example.com' && password === 'password') {
        const mockUser: User = {
          id: 1,
          username: 'admin',
          email: 'admin@example.com',
          role: 'admin'
        };
        
        // Store user in localStorage (simulating JWT storage)
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
      } else if (email === 'mechanic@example.com' && password === 'password') {
        const mockUser: User = {
          id: 2,
          username: 'mechanic',
          email: 'mechanic@example.com',
          role: 'mechanic'
        };
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This would be replaced with an actual API call to your Flask backend
      // For now, we'll simulate a successful registration
      if (email === 'admin@example.com') {
        throw new Error('Email already in use');
      }
      
      const mockUser: User = {
        id: Date.now(), // Simulate a unique ID
        username,
        email,
        role: 'receptionist' // Default role for new users
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};