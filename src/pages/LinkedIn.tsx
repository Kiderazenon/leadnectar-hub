
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Linkedin, 
  Plus, 
  Users, 
  MessageCircle, 
  Calendar, 
  Search, 
  Sparkles, 
  AlertCircle, 
  BellRing 
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const mockConnections = [
  { 
    id: '1', 
    name: 'Sophie Martin', 
    position: 'Marketing Director', 
    company: 'InnoTech Solutions', 
    status: 'connected', 
    lastActivity: '2023-11-10',
    notes: 'Intéressée par notre solution de CRM'
  },
  { 
    id: '2', 
    name: 'Jean Dupont', 
    position: 'CTO', 
    company: 'Digital Forge', 
    status: 'pending', 
    lastActivity: '2023-11-12',
    notes: ''
  },
  { 
    id: '3', 
    name: 'Marie Laurent', 
    position: 'CEO', 
    company: 'Global Innovations', 
    status: 'connected', 
    lastActivity: '2023-11-08',
    notes: 'A demandé une démo pour janvier'
  },
  { 
    id: '4', 
    name: 'Thomas Bernard', 
    position: 'Sales Director', 
    company: 'Tech Solutions', 
    status: 'messaged', 
    lastActivity: '2023-11-14',
    notes: 'En attente de réponse à notre proposition'
  },
  { 
    id: '5', 
    name: 'Claire Moreau', 
    position: 'Product Manager', 
    company: 'Smart Systems', 
    status: 'connected', 
    lastActivity: '2023-11-09',
    notes: ''
  }
];

const mockTemplates = [
  {
    id: '1',
    name: 'Invitation de connexion',
    content: 'Bonjour {{first_name}}, je souhaiterais vous ajouter à mon réseau professionnel. Au plaisir d\'échanger avec vous.',
    type: 'connection'
  },
  {
    id: '2',
    name: 'Suivi après connexion',
    content: 'Bonjour {{first_name}}, merci d\'avoir accepté ma demande de connexion. Je serais intéressé d\'en savoir plus sur vos besoins en matière de {{topic}}.',
    type: 'follow-up'
  },
  {
    id: '3',
    name: 'Présentation produit',
    content: 'Bonjour {{first_name}}, je voulais vous présenter notre solution LeadNectar qui pourrait répondre aux besoins de {{company}} en matière de prospection commerciale.',
    type: 'pitch'
  }
];

const mockCampaigns = [
  {
    id: '1',
    name: 'Prospection DSI',
    status: 'active',
    audience: 'CTO, DSI, IT Director',
    progress: {
      sent: 45,
      accepted: 22,
      replied: 15
    },
    template: 'Invitation de connexion',
    startDate: '2023-11-01'
  },
  {
    id: '2',
    name: 'Suivi Marketing',
    status: 'paused',
    audience: 'CMO, Marketing Manager, Digital Marketing',
    progress: {
      sent: 30,
      accepted: 18,
      replied: 9
    },
    template: 'Suivi après connexion',
    startDate: '2023-11-05'
  }
];

const statusColors: Record<string, string> = {
  connected: 'bg-green-500/10 text-green-600',
  pending: 'bg-amber-500/10 text-amber-600',
  messaged: 'bg-blue-500/10 text-blue-600'
};

const LinkedIn: React.FC = () => {
  const [connections, setConnections] = useState(mockConnections);
  const [templates, setTemplates] = useState(mockTemplates);
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<any>(null);
  const [isNewTemplate, setIsNewTemplate] = useState(false);
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(false);

  const filteredConnections = connections.filter(connection => 
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewTemplate = () => {
    setCurrentTemplate({ id: '', name: '', content: '', type: 'connection' });
    setIsNewTemplate(true);
    setIsTemplateDialogOpen(true);
  };

  const handleEditTemplate = (template: any) => {
    setCurrentTemplate(template);
    setIsNewTemplate(false);
    setIsTemplateDialogOpen(true);
  };

  const handleSaveTemplate = () => {
    if (isNewTemplate) {
      const newTemplate = {
        ...currentTemplate,
        id: `template-${Date.now()}`
      };
      setTemplates([...templates, newTemplate]);
      toast.success('Modèle créé avec succès');
    } else {
      setTemplates(templates.map(template => 
        template.id === currentTemplate.id ? currentTemplate : template
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
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted rounded-full p-4 mb-4">
                <Linkedin className="h-12 w-12 text-[#0077b5]" />
              </div>
              <h2 className="text-2xl font-semibold mb-3">Connectez votre compte LinkedIn</h2>
              <p className="text-muted-foreground max-w-md mb-6">
                Pour utiliser les fonctionnalités de marketing LinkedIn, vous devez connecter votre compte professionnel.
              </p>
              <Button className="bg-[#0077b5] hover:bg-[#0077b5]/90" onClick={handleConnectLinkedIn}>
                <Linkedin className="mr-2 h-4 w-4" />
                Connecter maintenant
              </Button>
            </div>
          </CardContent>
        </Card>
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
            <Card className="glass-card border border-border/50">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <CardTitle>Vos connexions LinkedIn</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher..."
                        className="pl-8 w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter manuellement
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Gérez vos connexions LinkedIn et suivez vos interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Poste & Entreprise</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Dernière activité</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredConnections.map(connection => (
                      <TableRow key={connection.id}>
                        <TableCell className="font-medium">{connection.name}</TableCell>
                        <TableCell>
                          <div>
                            <div>{connection.position}</div>
                            <div className="text-muted-foreground text-sm">{connection.company}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[connection.status] || ""}>
                            {connection.status === 'connected' ? 'Connecté' : 
                            connection.status === 'pending' ? 'En attente' : 'Message envoyé'}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(connection.lastActivity).toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Accès limité</AlertTitle>
              <AlertDescription>
                En raison des limitations de l'API LinkedIn, certaines fonctionnalités de messagerie sont restreintes. 
                Nous vous recommandons d'utiliser notre système de séquences d'e-mails combiné avec des alertes LinkedIn.
              </AlertDescription>
            </Alert>
            
            <Card className="glass-card border border-border/50">
              <CardHeader>
                <CardTitle>Modèles de messages</CardTitle>
                <CardDescription>
                  Créez et gérez des modèles pour vos messages LinkedIn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map(template => (
                    <Card key={template.id} className="border border-border/50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge>
                          {template.type === 'connection' ? 'Invitation' : 
                           template.type === 'follow-up' ? 'Suivi' : 'Présentation'}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm whitespace-pre-wrap">{template.content}</p>
                      </CardContent>
                      <div className="p-3 pt-0 flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template)}>
                          Modifier
                        </Button>
                      </div>
                    </Card>
                  ))}
                  <Card className="border border-dashed border-border/50 flex flex-col items-center justify-center p-6 h-full">
                    <Button variant="outline" className="mb-2" onClick={handleNewTemplate}>
                      <Plus className="h-4 w-4 mr-2" />
                      Nouveau modèle
                    </Button>
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      Créez des modèles personnalisés pour vos messages LinkedIn
                    </p>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-4">
            <Card className="glass-card border border-border/50">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Campagnes LinkedIn</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle campagne
                  </Button>
                </div>
                <CardDescription>
                  Gérez vos campagnes de prospection automatisées sur LinkedIn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map(campaign => (
                    <Card key={campaign.id} className="border border-border/50">
                      <CardContent className="pt-6">
                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-1">{campaign.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              Cible : {campaign.audience}
                            </p>
                            <Badge variant={campaign.status === 'active' ? 'success' : 'outline'}>
                              {campaign.status === 'active' ? 'Active' : 'En pause'}
                            </Badge>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">État :</span>
                              <Switch checked={campaign.status === 'active'} />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Depuis le {new Date(campaign.startDate).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center p-3 bg-muted/30 rounded-md">
                            <p className="text-sm text-muted-foreground">Invitations</p>
                            <p className="text-xl font-semibold">{campaign.progress.sent}</p>
                          </div>
                          <div className="text-center p-3 bg-muted/30 rounded-md">
                            <p className="text-sm text-muted-foreground">Acceptations</p>
                            <p className="text-xl font-semibold">{campaign.progress.accepted}</p>
                          </div>
                          <div className="text-center p-3 bg-muted/30 rounded-md">
                            <p className="text-sm text-muted-foreground">Réponses</p>
                            <p className="text-xl font-semibold">{campaign.progress.replied}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                          <Button variant="outline" size="sm">
                            Rapport
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card className="glass-card border border-border/50">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Modèles de messages</CardTitle>
                  <Button onClick={handleNewTemplate}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau modèle
                  </Button>
                </div>
                <CardDescription>
                  Gérez vos modèles pour les différentes étapes de votre prospection LinkedIn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Contenu</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {templates.map(template => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {template.type === 'connection' ? 'Invitation' : 
                             template.type === 'follow-up' ? 'Suivi' : 'Présentation'}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[400px]">
                          <p className="truncate">{template.content}</p>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template)}>
                              Modifier
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-destructive" 
                              onClick={() => handleDeleteTemplate(template.id)}
                            >
                              Supprimer
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isNewTemplate ? 'Créer un nouveau modèle' : 'Modifier le modèle'}
            </DialogTitle>
            <DialogDescription>
              Personnalisez votre modèle de message LinkedIn. Utilisez {{variable}} pour les variables dynamiques.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Nom du modèle</Label>
              <Input 
                id="template-name"
                value={currentTemplate?.name || ''}
                onChange={(e) => setCurrentTemplate({...currentTemplate, name: e.target.value})}
                placeholder="Ex: Invitation de connexion"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="template-type">Type de message</Label>
              <select 
                id="template-type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={currentTemplate?.type || 'connection'}
                onChange={(e) => setCurrentTemplate({...currentTemplate, type: e.target.value})}
              >
                <option value="connection">Invitation de connexion</option>
                <option value="follow-up">Suivi après connexion</option>
                <option value="pitch">Présentation produit</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="template-content">Contenu du message</Label>
              <Textarea 
                id="template-content"
                value={currentTemplate?.content || ''}
                onChange={(e) => setCurrentTemplate({...currentTemplate, content: e.target.value})}
                placeholder="Entrez votre message ici..."
                className="min-h-[120px]"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="font-medium">Variables disponibles:</span>
              <Badge variant="outline" className="cursor-pointer" 
                onClick={() => setCurrentTemplate({
                  ...currentTemplate, 
                  content: (currentTemplate?.content || '') + '{{first_name}}'
                })}
              >
                {{first_name}}
              </Badge>
              <Badge variant="outline" className="cursor-pointer"
                onClick={() => setCurrentTemplate({
                  ...currentTemplate, 
                  content: (currentTemplate?.content || '') + '{{last_name}}'
                })}
              >
                {{last_name}}
              </Badge>
              <Badge variant="outline" className="cursor-pointer"
                onClick={() => setCurrentTemplate({
                  ...currentTemplate, 
                  content: (currentTemplate?.content || '') + '{{company}}'
                })}
              >
                {{company}}
              </Badge>
              <Badge variant="outline" className="cursor-pointer"
                onClick={() => setCurrentTemplate({
                  ...currentTemplate, 
                  content: (currentTemplate?.content || '') + '{{position}}'
                })}
              >
                {{position}}
              </Badge>
              <Badge variant="outline" className="cursor-pointer"
                onClick={() => setCurrentTemplate({
                  ...currentTemplate, 
                  content: (currentTemplate?.content || '') + '{{topic}}'
                })}
              >
                {{topic}}
              </Badge>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTemplateDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveTemplate}>
              {isNewTemplate ? 'Créer' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LinkedIn;
