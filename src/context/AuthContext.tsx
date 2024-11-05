"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Define UserModel interface
interface UserModel {
  _id: string;
  username: string;
  email: string;
  linkedinprofile: string;
  // Add other fields as needed
}

// Define AuthContextType interface
interface AuthContextType {
  user: UserModel | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  // Check if the user is authenticated on load
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('/api/users/verify-token');

        if (response.data.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log('Request failed:', error);
      }
    };
    checkAuthentication();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/users/login', { email, password });
      setUser(response.data.user);
      setIsAuthenticated(true);
      router.push('/'); // Redirect to home page after login
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Failed to login');
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      setUser(null);
      setIsAuthenticated(false);
      router.push('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
      throw new Error('Failed to logout');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};