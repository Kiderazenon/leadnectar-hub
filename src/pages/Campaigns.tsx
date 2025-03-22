
import React, { useState } from 'react';
import CampaignsList from '@/components/campaigns/CampaignsList';
import EmailTemplate from '@/components/campaigns/EmailTemplate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Campaigns: React.FC = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  
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
          <CampaignsList />
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EmailTemplate />
            
            <EmailTemplate 
              template={{
                id: 'follow-up',
                name: 'Suivi après rendez-vous',
                subject: 'Merci pour notre échange, {{prenom}}',
                body: `Bonjour {{prenom}},

Je tenais à vous remercier pour notre conversation d'aujourd'hui. J'ai été ravi d'en apprendre plus sur {{entreprise}} et vos besoins spécifiques.

Comme promis, je vous envoie le document de présentation contenant les informations dont nous avons discuté.

N'hésitez pas à me contacter si vous avez des questions supplémentaires.

Cordialement,
{{signature}}`,
                createdAt: '2023-10-15T10:00:00Z',
                updatedAt: '2023-10-20T14:30:00Z',
              }}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="sequences" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">Fonctionnalité à venir</h3>
            <p className="text-muted-foreground mb-4">
              Les séquences automatisées seront disponibles prochainement.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Campaigns;
