
import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Index: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  // Éviter les boucles infinies en s'assurant que l'état d'authentification est chargé
  useEffect(() => {
    // Configurer le titre de la page
    document.title = "LeadNectar - CRM Marketing Multicanal";
    
    // Simuler un temps de chargement court pour assurer que le contexte d'authentification est prêt
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Afficher un indicateur de chargement pendant l'initialisation
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="text-2xl font-bold mb-2">
            Lead<span className="text-primary">Nectar</span>
          </div>
          <p className="text-muted-foreground">Chargement en cours...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/50">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            Lead<span className="text-primary">Nectar</span>
          </div>
          <div>
            {user ? (
              <Link to="/dashboard">
                <Button>Tableau de bord</Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button>Connexion</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto p-4 py-12 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Optimisez votre prospection avec LeadNectar
          </h1>
          <p className="text-xl text-muted-foreground mb-10">
            Une solution CRM complète avec des fonctionnalités marketing multicanal
            pour booster votre croissance commerciale.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="px-8">
                  Accéder au tableau de bord
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button size="lg" className="px-8">
                    Commencer gratuitement
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="px-8">
                    Voir une démo
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          <div className="rounded-xl overflow-hidden border border-border/50 shadow-lg">
            <img 
              src="https://via.placeholder.com/1200x600?text=LeadNectar+Dashboard+Preview" 
              alt="LeadNectar Dashboard" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LeadNectar. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
