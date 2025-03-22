
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Linkedin, Users, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Import types
import { LinkedInTemplate } from '@/features/linkedin/types';

// Import mock data
import { mockConnections, mockTemplates, mockCampaigns } from '@/features/linkedin/data/mockData';

// Import components
import ConnectLinkedInPrompt from '@/features/linkedin/components/ConnectLinkedInPrompt';
import ConnectionsTab from '@/features/linkedin/components/ConnectionsTab';
import MessagesTab from '@/features/linkedin/components/MessagesTab';
import CampaignsTab from '@/features/linkedin/components/CampaignsTab';
import TemplatesTab from '@/features/linkedin/components/TemplatesTab';
import TemplateDialog from '@/features/linkedin/components/TemplateDialog';

const LinkedIn: React.FC = () => {
  const [connections, setConnections] = useState(mockConnections);
  const [templates, setTemplates] = useState(mockTemplates);
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<Partial<LinkedInTemplate> | null>(null);
  const [isNewTemplate, setIsNewTemplate] = useState(false);
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(false);

  const handleNewTemplate = () => {
    setCurrentTemplate({ id: '', name: '', content: '', type: 'connection' });
    setIsNewTemplate(true);
    setIsTemplateDialogOpen(true);
  };

  const handleEditTemplate = (template: LinkedInTemplate) => {
    setCurrentTemplate(template);
    setIsNewTemplate(false);
    setIsTemplateDialogOpen(true);
  };

  const handleSaveTemplate = () => {
    if (isNewTemplate) {
      const newTemplate = {
        ...currentTemplate,
        id: `template-${Date.now()}`
      } as LinkedInTemplate;
      setTemplates([...templates, newTemplate]);
      toast.success('Modèle créé avec succès');
    } else {
      setTemplates(templates.map(template => 
        template.id === currentTemplate?.id ? { ...template, ...currentTemplate } as LinkedInTemplate : template
      ));
      toast.success('Modèle mis à jour avec succès');
    }
    setIsTemplateDialogOpen(false);
  };

  const handleDeleteTemplate = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce modèle ?')) {
      setTemplates(templates.filter(template => template.id !== id));
      toast.success('Modèle supprimé avec succès');
    }
  };

  const handleConnectLinkedIn = () => {
    // Dans une application réelle, ceci ouvrirait l'authentification OAuth de LinkedIn
    setIsLinkedInConnected(true);
    toast.success('Compte LinkedIn connecté avec succès');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-[#0077b5]/10 p-2 rounded-md">
            <Linkedin className="h-8 w-8 text-[#0077b5]" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold">LinkedIn Marketing</h1>
            <p className="text-muted-foreground">Gérez vos campagnes de prospection sur LinkedIn</p>
          </div>
        </div>
        
        {!isLinkedInConnected && (
          <Button className="bg-[#0077b5] hover:bg-[#0077b5]/90" onClick={handleConnectLinkedIn}>
            <Linkedin className="mr-2 h-4 w-4" />
            Connecter votre compte LinkedIn
          </Button>
        )}
      </div>

      {!isLinkedInConnected ? (
        <ConnectLinkedInPrompt onConnect={handleConnectLinkedIn} />
      ) : (
        <Tabs defaultValue="connections" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-xl">
            <TabsTrigger value="connections">
              <Users className="h-4 w-4 mr-2" />
              Connexions
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageCircle className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="campaigns">
              <Calendar className="h-4 w-4 mr-2" />
              Campagnes
            </TabsTrigger>
            <TabsTrigger value="templates">
              <Sparkles className="h-4 w-4 mr-2" />
              Modèles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connections" className="space-y-4">
            <ConnectionsTab connections={connections} />
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <MessagesTab 
              templates={templates} 
              onNewTemplate={handleNewTemplate} 
              onEditTemplate={handleEditTemplate} 
            />
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-4">
            <CampaignsTab 
              campaigns={campaigns} 
              onNewCampaign={() => toast.info('Fonctionnalité à venir')} 
            />
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <TemplatesTab 
              templates={templates} 
              onNewTemplate={handleNewTemplate} 
              onEditTemplate={handleEditTemplate} 
              onDeleteTemplate={handleDeleteTemplate} 
            />
          </TabsContent>
        </Tabs>
      )}

      <TemplateDialog 
        open={isTemplateDialogOpen}
        onOpenChange={setIsTemplateDialogOpen}
        currentTemplate={currentTemplate}
        onSave={handleSaveTemplate}
        isNewTemplate={isNewTemplate}
        setCurrentTemplate={setCurrentTemplate}
      />
    </div>
  );
};

export default LinkedIn;
