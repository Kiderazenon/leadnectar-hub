
import React, { useState, lazy, Suspense } from 'react';
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

// Import des composants avec lazy loading, mais avec gestion d'erreur
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

  // Simuler la fin du chargement après 1 seconde
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // Nettoyer le timer si le composant est démonté
    return () => clearTimeout(timer);
  }, []);
  
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
