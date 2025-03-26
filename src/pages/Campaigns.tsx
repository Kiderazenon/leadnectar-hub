
import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plus, Calendar, Mail, Clock, Loader } from 'lucide-react';

// Composant de fallback pendant le chargement
const LoadingFallback = () => (
  <div className="flex justify-center items-center p-12">
    <Loader className="h-8 w-8 animate-spin text-primary" />
    <p className="ml-2">Chargement du contenu...</p>
  </div>
);

// Import des composants avec lazy loading et gestion d'erreur
const CampaignsList = lazy(() => 
  import('@/components/campaigns/CampaignsList')
    .catch(err => {
      console.error('Erreur lors du chargement de CampaignsList:', err);
      return { default: () => <div>Erreur de chargement du composant. Veuillez rafraîchir la page.</div> };
    })
);

const EmailTemplateLibrary = lazy(() => 
  import('@/components/campaigns/EmailTemplateLibrary')
    .catch(err => {
      console.error('Erreur lors du chargement de EmailTemplateLibrary:', err);
      return { default: () => <div>Erreur de chargement du composant. Veuillez rafraîchir la page.</div> };
    })
);

const EmailSequenceBuilder = lazy(() => 
  import('@/components/campaigns/EmailSequenceBuilder')
    .catch(err => {
      console.error('Erreur lors du chargement de EmailSequenceBuilder:', err);
      return { default: () => <div>Erreur de chargement du composant. Veuillez rafraîchir la page.</div> };
    })
);

const Campaigns: React.FC = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [isLoading, setIsLoading] = useState(true);
  const [componentError, setComponentError] = useState<string | null>(null);

  // Gérer le chargement initial avec un délai raisonnable
  useEffect(() => {
    console.log("Initialisation de la page Campaigns");
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log("Chargement initial terminé");
    }, 1000);
    
    // Nettoyer le timer si le composant est démonté
    return () => {
      console.log("Nettoyage du timer de chargement");
      clearTimeout(timer);
    };
  }, []);
  
  // Gérer les erreurs de suspense
  const handleSuspenseError = (error: Error) => {
    console.error("Erreur lors du chargement d'un composant:", error);
    setComponentError("Une erreur s'est produite lors du chargement. Veuillez rafraîchir la page.");
  };
  
  // Afficher un loader pendant le chargement initial
  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Campagnes</h1>
        </div>
        <LoadingFallback />
      </div>
    );
  }
  
  // Afficher le message d'erreur si une erreur s'est produite
  if (componentError) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Campagnes</h1>
        </div>
        <div className="p-6 border border-red-300 bg-red-50 rounded-md text-red-800">
          {componentError}
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => window.location.reload()}
          >
            Rafraîchir la page
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 max-w-7xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Campagnes</h1>
      </div>
      
      <Tabs defaultValue="campaigns" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="templates">Modèles d'emails</TabsTrigger>
          <TabsTrigger value="sequences">Séquences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaigns" className="mt-6">
          <Suspense fallback={<LoadingFallback />}>
            <CampaignsList />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <Suspense fallback={<LoadingFallback />}>
            <EmailTemplateLibrary />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="sequences" className="mt-6">
          <Suspense fallback={<LoadingFallback />}>
            <EmailSequenceBuilder />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Campaigns;
