
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Check, Mail, Send, User, Shield, Bell, Database, CreditCard, LucideIcon, Linkedin } from 'lucide-react';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

const SettingItem: React.FC<SettingItemProps> = ({ icon, title, description, href }) => {
  return (
    <div className="flex items-start space-x-4 rounded-lg border border-border p-4 transition-all hover:bg-muted/50">
      <div className="mt-0.5 rounded-md bg-muted p-2.5">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const Settings: React.FC = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Paramètres</h1>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="integrations">Intégrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card className="glass-card border border-border/50">
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                Mettez à jour vos informations personnelles et professionnelles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" alt="John Doe" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Photo de profil</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Modifier</Button>
                    <Button variant="outline" size="sm" className="text-muted-foreground">Supprimer</Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" type="tel" defaultValue="+33 6 12 34 56 78" />
                </div>
                
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="company">Entreprise</Label>
                  <Input id="company" defaultValue="LeadNectar" />
                </div>
                
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="position">Poste</Label>
                  <Input id="position" defaultValue="Sales Manager" />
                </div>
                
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    rows={4} 
                    defaultValue="Sales Manager chez LeadNectar. Passionné par la prospection et le développement commercial." 
                  />
                </div>
              </div>
              
              <div className="sm:col-span-2 flex justify-end gap-2">
                <Button variant="outline">Annuler</Button>
                <Button>Enregistrer</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border border-border/50">
            <CardHeader>
              <CardTitle>Signature d'email</CardTitle>
              <CardDescription>
                Personnalisez votre signature pour tous vos emails.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                rows={6} 
                defaultValue={`John Doe
Sales Manager
LeadNectar

Email: john.doe@example.com
Tél: +33 6 12 34 56 78
www.leadnectar.com`} 
              />
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">Annuler</Button>
                <Button>Enregistrer</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-6">
          <Card className="glass-card border border-border/50">
            <CardHeader>
              <CardTitle>Intégrations d'emails</CardTitle>
              <CardDescription>
                Connectez votre compte à des services d'envoi d'emails.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <SettingItem 
                  icon={<Mail className="h-5 w-5 text-primary" />}
                  title="Gmail"
                  description="Connectez votre compte Gmail pour envoyer des emails depuis votre boîte personnelle."
                />
                
                <SettingItem 
                  icon={<Send className="h-5 w-5 text-primary" />}
                  title="Sendgrid"
                  description="Utilisez Sendgrid pour des envois en masse avec un suivi précis des performances."
                />
                
                <SettingItem 
                  icon={<Mail className="h-5 w-5 text-primary" />}
                  title="Outlook / Office 365"
                  description="Connectez votre compte professionnel Microsoft pour l'envoi d'emails."
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border border-border/50">
            <CardHeader>
              <CardTitle>Services tiers</CardTitle>
              <CardDescription>
                Connectez-vous à des services externes pour étendre les fonctionnalités.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SettingItem 
                icon={<Linkedin className="h-5 w-5 text-[#0077b5]" />}
                title="LinkedIn"
                description="Connectez-vous à LinkedIn pour la prospection et les messages automatisés."
              />
              
              <SettingItem 
                icon={<Database className="h-5 w-5 text-primary" />}
                title="Zapier"
                description="Automatisez des workflows avec plus de 3,000 applications."
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-card border border-border/50">
            <CardHeader>
              <CardTitle>Préférences de notifications</CardTitle>
              <CardDescription>
                Configurez quand et comment vous souhaitez recevoir des notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <h4 className="font-medium">Emails reçus</h4>
                    <p className="text-sm text-muted-foreground">Recevoir une notification quand un prospect répond à un email.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <h4 className="font-medium">Interactions LinkedIn</h4>
                    <p className="text-sm text-muted-foreground">Recevoir une notification pour les réponses et connections LinkedIn.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <h4 className="font-medium">Rappels de tâches</h4>
                    <p className="text-sm text-muted-foreground">Recevoir des rappels pour les tâches à effectuer.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <h4 className="font-medium">Mises à jour du système</h4>
                    <p className="text-sm text-muted-foreground">Recevoir des notifications sur les nouvelles fonctionnalités.</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card className="glass-card border border-border/50">
            <CardHeader>
              <CardTitle>Sécurité du compte</CardTitle>
              <CardDescription>
                Gérez la sécurité de votre compte et vos options d'authentification.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <h4 className="font-medium">Authentification à deux facteurs</h4>
                    <p className="text-sm text-muted-foreground">Ajouter une couche de sécurité supplémentaire à votre compte.</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Changer le mot de passe</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2 sm:col-span-2">
                      <Button>Mettre à jour le mot de passe</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border border-border/50">
            <CardHeader>
              <CardTitle>Confidentialité des données</CardTitle>
              <CardDescription>
                Gérez vos préférences concernant l'utilisation de vos données.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <h4 className="font-medium">Collecte de données d'utilisation</h4>
                    <p className="text-sm text-muted-foreground">Autoriser la collecte de données pour améliorer le service.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <h4 className="font-medium">Partage de données avec des partenaires</h4>
                    <p className="text-sm text-muted-foreground">Autoriser le partage de données avec des services tiers intégrés.</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" className="text-muted-foreground">
                    Télécharger mes données
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
