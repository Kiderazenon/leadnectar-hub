
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const NotFound: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Détermine où rediriger l'utilisateur en fonction de son état d'authentification
  const redirectPath = user ? "/dashboard" : "/";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md w-full animate-fade-in">
        <h1 className="text-6xl font-bold mb-6 text-primary">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oups ! La page que vous recherchez n'existe pas.
        </p>
        <p className="text-muted-foreground mb-8">
          L'URL <code className="bg-muted px-1 py-0.5 rounded">{location.pathname}</code> n'a pas été trouvée.
        </p>
        <Link to={redirectPath}>
          <Button className="min-w-[200px]">
            {user ? "Retour au tableau de bord" : "Retour à l'accueil"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
