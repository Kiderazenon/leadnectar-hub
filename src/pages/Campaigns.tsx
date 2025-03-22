
import React, { useState } from 'react';
import CampaignsList from '@/components/campaigns/CampaignsList';
import EmailTemplate from '@/components/campaigns/EmailTemplate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plus, Calendar, Mail, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Séquence 1 */}
            <Card className="glass-card border border-border/50">
              <CardHeader>
                <CardTitle>Séquence initiale</CardTitle>
                <CardDescription>Première approche de prospects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      <span>3 emails</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">15 jours</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="bg-primary/10 text-primary text-xs rounded-full h-5 w-5 flex items-center justify-center mr-2">1</span>
                        <span>Présentation initiale</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Jour 1</div>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="bg-primary/10 text-primary text-xs rounded-full h-5 w-5 flex items-center justify-center mr-2">2</span>
                        <span>Premier suivi</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Jour 4</div>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="bg-primary/10 text-primary text-xs rounded-full h-5 w-5 flex items-center justify-center mr-2">3</span>
                        <span>Proposition valeur</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Jour 10</div>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-border/50 pt-4">
                <Button variant="outline" size="sm">Éditer</Button>
                <Button size="sm">Utiliser</Button>
              </CardFooter>
            </Card>
            
            {/* Séquence 2 */}
            <Card className="glass-card border border-border/50">
              <CardHeader>
                <CardTitle>Suivi après salon</CardTitle>
                <CardDescription>Pour les contacts rencontrés en événement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      <span>4 emails</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">21 jours</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="bg-primary/10 text-primary text-xs rounded-full h-5 w-5 flex items-center justify-center mr-2">1</span>
                        <span>Rappel de rencontre</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Jour 1</div>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="bg-primary/10 text-primary text-xs rounded-full h-5 w-5 flex items-center justify-center mr-2">2</span>
                        <span>Document promis</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Jour 3</div>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="bg-primary/10 text-primary text-xs rounded-full h-5 w-5 flex items-center justify-center mr-2">3</span>
                        <span>Invitation démo</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Jour 8</div>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="bg-primary/10 text-primary text-xs rounded-full h-5 w-5 flex items-center justify-center mr-2">4</span>
                        <span>Dernière relance</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Jour 15</div>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-border/50 pt-4">
                <Button variant="outline" size="sm">Éditer</Button>
                <Button size="sm">Utiliser</Button>
              </CardFooter>
            </Card>
            
            {/* Créer une nouvelle séquence */}
            <Card className="glass-card border border-border/50 border-dashed flex flex-col justify-center items-center p-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-3 inline-flex mb-4">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Nouvelle séquence</h3>
                <p className="text-sm text-muted-foreground mb-4">Créez un parcours d'emails automatisé pour vos contacts</p>
                <Button>
                  <span>Créer une séquence</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Campaigns;
