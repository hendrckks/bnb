export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  }
  
  export interface AuthContextType {
    user: User | null;
    loading: boolean;
    showAuthModal: boolean;
    setShowAuthModal: (show: boolean) => void;
    authFormType: 'login' | 'signup';
    setAuthFormType: (type: 'login' | 'signup') => void;
  }