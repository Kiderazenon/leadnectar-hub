
import React, { useState } from 'react';
import CampaignsList from '@/components/campaigns/CampaignsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plus, Calendar, Mail, Clock } from 'lucide-react';
import EmailTemplateLibrary from '@/components/campaigns/EmailTemplateLibrary';
import EmailSequenceBuilder from '@/components/campaigns/EmailSequenceBuilder';

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
          <EmailTemplateLibrary />
        </TabsContent>
        
        <TabsContent value="sequences" className="mt-6">
          <EmailSequenceBuilder />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Campaigns;
