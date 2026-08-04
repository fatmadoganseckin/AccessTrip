import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Organization, OrgRole, PermissionKey } from '../types/organization';
import { SEEDED_ORGANIZATIONS, SEEDED_MEMBERS } from '../services/mockDataSeeder';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
}

interface AuthContextType {
  user: UserProfile | null;
  activeOrg: Organization;
  activeRole: OrgRole;
  userOrgs: Organization[];
  setActiveOrg: (org: Organization) => void;
  hasPermission: (permission: PermissionKey) => boolean;
  login: (email: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>({
    id: 'usr-sarah-jenkins',
    email: 'sarah.j@spinal.co.uk',
    name: 'Sarah Jenkins',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  });

  const [activeOrg, setActiveOrgState] = useState<Organization>(SEEDED_ORGANIZATIONS[0]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const userOrgs = SEEDED_ORGANIZATIONS;

  const activeMember = SEEDED_MEMBERS.find(m => m.organizationId === activeOrg.id) || SEEDED_MEMBERS[0];
  const activeRole: OrgRole = activeMember.role;

  const hasPermission = (permission: PermissionKey): boolean => {
    if (activeRole === 'owner' || activeRole === 'administrator') return true;
    if (activeRole === 'finance_manager' && permission.startsWith('funding')) return true;
    if (activeRole === 'case_manager' && (permission.startsWith('cases') || permission.startsWith('travellers'))) return true;
    if (activeRole === 'travel_coordinator' && (permission.startsWith('cases') || permission.startsWith('travellers') || permission.startsWith('accessibility'))) return true;
    if (activeRole === 'accessibility_specialist' && permission.startsWith('accessibility')) return true;
    if (activeRole === 'volunteer' && permission === 'cases.read') return true;
    return false;
  };

  const setActiveOrg = (org: Organization) => {
    setActiveOrgState(org);
  };

  const login = (email: string) => {
    setUser({
      id: 'usr-demo',
      email,
      name: email.split('@')[0],
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    });
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        activeOrg,
        activeRole,
        userOrgs,
        setActiveOrg,
        hasPermission,
        login,
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
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
