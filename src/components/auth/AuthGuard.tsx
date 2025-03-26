
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  console.log("AuthGuard rendered:", { path: location.pathname, user: !!user, loading, isAdmin });

  useEffect(() => {
    if (!loading) {
      console.log("AuthGuard check complete:", { 
        path: location.pathname, 
        isAuthenticated: !!user, 
        shouldRedirect: !user && location.pathname !== '/auth' 
      });
    }
  }, [loading, user, location.pathname]);

  if (loading) {
    console.log("AuthGuard: Loading...");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log("AuthGuard: No user, redirecting to /auth");
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    console.log("AuthGuard: Not admin, redirecting to /dashboard");
    // Rediriger vers le tableau de bord si l'utilisateur n'est pas administrateur
    return <Navigate to="/dashboard" replace />;
  }

  console.log("AuthGuard: Rendering children");
  return <>{children}</>;
};

export default AuthGuard;
