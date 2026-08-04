import React, { createContext, useContext, useState } from 'react';
import { User } from '../types/notification';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string) => Promise<void>;
  loginWithSupabase: () => Promise<void>;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const DEFAULT_USER: User = {
  id: 'usr-101',
  email: 'alex.rivera@accesstrip.org',
  name: 'Alex Rivera',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  provider: 'google',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('accesstrip_user_auth');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const loginWithGoogle = async () => {
    const newUser: User = {
      id: `usr-g-${Date.now()}`,
      email: 'traveler.google@gmail.com',
      name: 'Taylor Morgan',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      provider: 'google',
    };
    setUser(newUser);
    localStorage.setItem('accesstrip_user_auth', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
  };

  const loginWithEmail = async (email: string) => {
    const newUser: User = {
      id: `usr-e-${Date.now()}`,
      email: email,
      name: email.split('@')[0],
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      provider: 'email',
    };
    setUser(newUser);
    localStorage.setItem('accesstrip_user_auth', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
  };

  const loginWithSupabase = async () => {
    const newUser: User = {
      id: `usr-sb-${Date.now()}`,
      email: 'verified.traveler@supabase.io',
      name: 'Jordan Smith',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      provider: 'supabase',
    };
    setUser(newUser);
    localStorage.setItem('accesstrip_user_auth', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accesstrip_user_auth');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginWithGoogle,
        loginWithEmail,
        loginWithSupabase,
        logout,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
