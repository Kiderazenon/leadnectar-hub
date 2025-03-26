
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

type Profile = {
  id: string;
  firstname: string;
  lastname: string;
  avatar_url: string | null;
  role: string;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstname: string, lastname: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Fonction pour charger le profil utilisateur
  const loadUserProfile = async (userId: string) => {
    try {
      console.log("Chargement du profil utilisateur pour:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Erreur lors du chargement du profil:', error);
        return null;
      }

      console.log("Profil utilisateur chargé:", data);
      setProfile(data as Profile);
      setIsAdmin(data?.role === 'admin');
      return data as Profile;
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
      return null;
    }
  };

  useEffect(() => {
    console.log("AuthProvider initialized");
    
    // Configurer l'écouteur d'état d'authentification en PREMIER
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, sessionData) => {
        console.log("Auth state changed:", event, sessionData?.user?.id);
        
        setSession(sessionData);
        setUser(sessionData?.user ?? null);
        
        if (sessionData?.user) {
          await loadUserProfile(sessionData.user.id);
        } else {
          setProfile(null);
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // ENSUITE vérifier s'il y a une session existante
    const checkExistingSession = async () => {
      try {
        console.log("Checking existing session");
        const { data: { session: existingSession } } = await supabase.auth.getSession();
        
        console.log("Existing session:", existingSession?.user?.id);
        
        setSession(existingSession);
        setUser(existingSession?.user ?? null);
        
        if (existingSession?.user) {
          await loadUserProfile(existingSession.user.id);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error checking session:", error);
        setLoading(false);
      }
    };
    
    checkExistingSession();

    // Nettoyer l'écouteur
    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("Tentative de connexion:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        console.log("Connexion réussie pour:", data.user.id);
        await loadUserProfile(data.user.id);
        navigate('/dashboard');
        toast.success('Connexion réussie');
      }
    } catch (error: any) {
      console.error("Erreur de connexion:", error.message);
      toast.error(error.message || 'Erreur lors de la connexion');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstname: string, lastname: string) => {
    try {
      setLoading(true);
      console.log("Tentative d'inscription:", email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstname,
            lastname,
          },
        },
      });

      if (error) {
        throw error;
      }

      console.log("Inscription réussie");
      toast.success('Compte créé avec succès. Veuillez vous connecter.');
      navigate('/auth');
    } catch (error: any) {
      console.error("Erreur d'inscription:", error.message);
      toast.error(error.message || 'Erreur lors de la création du compte');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      console.log("Tentative de déconnexion");
      
      await supabase.auth.signOut();
      setProfile(null);
      setIsAdmin(false);
      setUser(null);
      setSession(null);
      
      console.log("Déconnexion réussie");
      navigate('/auth');
      toast.success('Déconnexion réussie');
    } catch (error: any) {
      console.error("Erreur de déconnexion:", error.message);
      toast.error(error.message || 'Erreur lors de la déconnexion');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};
