import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { professionalUser, studentUser, companyUser } from '../data/mockData';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, profileType: 'student' | 'professional' | 'company') => Promise<void>;
  logout: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profileType: 'student' | 'professional' | 'company';
  avatar?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string, profileType: 'student' | 'professional' | 'company') => {
    // This is a mock authentication
    if (email === 'demo@example.com' && password === 'password') {
      let userProfile;
      if (profileType === 'student') {
        userProfile = studentUser;
      } else if (profileType === 'company') {
        userProfile = companyUser;
      } else {
        userProfile = professionalUser;
      }
      setUser(userProfile);
      setIsAuthenticated(true);
      navigate('/');
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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