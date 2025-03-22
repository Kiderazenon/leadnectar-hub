
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { 
  Linkedin, 
  Send, 
  CreditCard, 
  Webhook, 
  FileJson, 
  MessageSquare,
  CalendarDays,
  Link, 
  Link2, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface IntegrationProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'connected' | 'disconnected' | 'error';
  onConnect: () => void;
  onDisconnect: () => void;
  onSettings?: () => void;
  settings?: React.ReactNode;
}

const Integration: React.FC<IntegrationProps> = ({
  title,
  description,
  icon,
  status,
  onConnect,
  onDisconnect,
  onSettings,
  settings
}) => {
  const [showSettings, setShowSettings] = useState(false);
  
  return (
    <Card className="border border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge 
            variant={
              status === 'connected' ? 'success' : 
              status === 'error' ? 'destructive' : 
              'outline'
            }
          >
            {status === 'connected' ? 'Connecté' : 
             status === 'error' ? 'Erreur' : 
             'Non connecté'}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {status === 'connected' ? (
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={onDisconnect}>
                Déconnecter
              </Button>
              {onSettings && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowSettings(!showSettings)}
                >
                  {showSettings ? 'Masquer les paramètres' : 'Paramètres'}
                </Button>
              )}
            </div>
          ) : (
            <Button onClick={onConnect}>
              Connecter
            </Button>
          )}
          
          {showSettings && settings && (
            <div className="pt-4 border-t mt-4">
              {settings}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const AdminIntegrations: React.FC = () => {
  const [integrations, setIntegrations] = useState({
    linkedin: { status: 'disconnected' as const, settings: {} },
    sendgrid: { status: 'connected' as const, settings: { apiKey: '••••••••••••••••', fromEmail: 'noreply@leadnectar.com' } },
    stripe: { status: 'connected' as const, settings: { testMode: true } },
    zapier: { status: 'connected' as const, settings: {} },
    googleCalendar: { status: 'disconnected' as const, settings: {} },
    slack: { status: 'disconnected' as const, settings: {} },
    hubspot: { status: 'disconnected' as const, settings: {} },
  });
  
  const handleConnect = (integration: keyof typeof integrations) => {
    // Simulation de connexion
    setIntegrations({
      ...integrations,
      [integration]: { 
        ...integrations[integration], 
        status: 'connected',
        settings: {}
      }
    });
    toast.success(`${integration} connecté avec succès`);
  };
  
  const handleDisconnect = (integration: keyof typeof integrations) => {
    // Demande de confirmation
    if (window.confirm(`Êtes-vous sûr de vouloir déconnecter ${integration} ?`)) {
      setIntegrations({
        ...integrations,
        [integration]: { 
          ...integrations[integration], 
          status: 'disconnected',
        }
      });
      toast.success(`${integration} déconnecté avec succès`);
    }
  };
  
  const handleSaveSettings = (integration: keyof typeof integrations, settings: any) => {
    setIntegrations({
      ...integrations,
      [integration]: { 
        ...integrations[integration], 
        settings: {
          ...integrations[integration].settings,
          ...settings
        }
      }
    });
    toast.success(`Paramètres de ${integration} mis à jour`);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Integration
          title="LinkedIn"
          description="Connectez-vous à LinkedIn pour automatiser la prospection et suivre les interactions."
          icon={<Linkedin className="h-5 w-5 text-[#0077b5]" />}
          status={integrations.linkedin.status}
          onConnect={() => handleConnect('linkedin')}
          onDisconnect={() => handleDisconnect('linkedin')}
          onSettings={() => {}}
          settings={
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="linkedin-scope">Autorisations</Label>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Badge variant="outline">Profil</Badge>
                  <Badge variant="outline">Messages</Badge>
                  <Badge variant="outline">Connexions</Badge>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="linkedin-webhook">Webhook URL</Label>
                <div className="flex">
                  <Input 
                    id="linkedin-webhook" 
                    value="https://app.leadnectar.com/api/webhooks/linkedin" 
                    readOnly
                    className="rounded-r-none"
                  />
                  <Button variant="outline" className="rounded-l-none border-l-0">
                    Copier
                  </Button>
                </div>
              </div>
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open('https://www.linkedin.com/developers/apps', '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Gérer l'application LinkedIn
                </Button>
              </div>
            </div>
          }
        />
        
        <Integration
          title="SendGrid"
          description="Intégrez SendGrid pour l'envoi d'emails en masse et le suivi des performances."
          icon={<Send className="h-5 w-5 text-blue-500" />}
          status={integrations.sendgrid.status}
          onConnect={() => handleConnect('sendgrid')}
          onDisconnect={() => handleDisconnect('sendgrid')}
          onSettings={() => {}}
          settings={
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="sendgrid-api-key">Clé API</Label>
                <Input 
                  id="sendgrid-api-key" 
                  type="password" 
                  value={integrations.sendgrid.settings.apiKey} 
                  onChange={(e) => handleSaveSettings('sendgrid', { apiKey: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="sendgrid-from-email">Email d'expéditeur par défaut</Label>
                <Input 
                  id="sendgrid-from-email" 
                  type="email" 
                  value={integrations.sendgrid.settings.fromEmail} 
                  onChange={(e) => handleSaveSettings('sendgrid', { fromEmail: e.target.value })}
                />
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" onClick={() => toast.success('Email de test envoyé')}>
                  Envoyer un email de test
                </Button>
              </div>
            </div>
          }
        />
        
        <Integration
          title="Stripe"
          description="Intégrez Stripe pour gérer les paiements et les abonnements."
          icon={<CreditCard className="h-5 w-5 text-violet-500" />}
          status={integrations.stripe.status}
          onConnect={() => handleConnect('stripe')}
          onDisconnect={() => handleDisconnect('stripe')}
          onSettings={() => {}}
          settings={
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="stripe-test-mode">Mode test</Label>
                <Switch 
                  id="stripe-test-mode" 
                  checked={integrations.stripe.settings.testMode}
                  onCheckedChange={(checked) => handleSaveSettings('stripe', { testMode: checked })}
                />
              </div>
              <div className="space-y-1">
                <Label>Clé API {integrations.stripe.settings.testMode ? '(test)' : '(production)'}</Label>
                <Input 
                  type="password" 
                  value="sk_••••••••••••••••••••••••••••••" 
                  readOnly
                />
              </div>
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open('https://dashboard.stripe.com/', '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Accéder au tableau de bord Stripe
                </Button>
              </div>
            </div>
          }
        />
        
        <Integration
          title="Zapier"
          description="Automatisez vos workflows en connectant LeadNectar à plus de 3 000 applications via Zapier."
          icon={<Webhook className="h-5 w-5 text-orange-500" />}
          status={integrations.zapier.status}
          onConnect={() => handleConnect('zapier')}
          onDisconnect={() => handleDisconnect('zapier')}
          onSettings={() => {}}
          settings={
            <div className="space-y-3">
              <div className="space-y-1">
                <Label>Webhook URL pour les Zaps entrants</Label>
                <div className="flex">
                  <Input 
                    value="https://app.leadnectar.com/api/webhooks/zapier" 
                    readOnly
                    className="rounded-r-none"
                  />
                  <Button variant="outline" className="rounded-l-none border-l-0">
                    Copier
                  </Button>
                </div>
              </div>
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open('https://zapier.com/app/dashboard', '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Gérer vos Zaps
                </Button>
              </div>
            </div>
          }
        />
        
        <Integration
          title="Google Calendar"
          description="Synchronisez vos rendez-vous et événements avec Google Calendar."
          icon={<CalendarDays className="h-5 w-5 text-red-500" />}
          status={integrations.googleCalendar.status}
          onConnect={() => handleConnect('googleCalendar')}
          onDisconnect={() => handleDisconnect('googleCalendar')}
        />
        
        <Integration
          title="Slack"
          description="Recevez des notifications et interagissez avec LeadNectar depuis Slack."
          icon={<MessageSquare className="h-5 w-5 text-green-500" />}
          status={integrations.slack.status}
          onConnect={() => handleConnect('slack')}
          onDisconnect={() => handleDisconnect('slack')}
        />
      </div>
      
      <Card className="glass-card border border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileJson className="h-5 w-5 text-primary" />
            <CardTitle>API et Webhooks</CardTitle>
          </div>
          <CardDescription>
            Gérez l'accès à l'API LeadNectar et configurez des webhooks personnalisés.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Clés API</h3>
                <p className="text-sm text-muted-foreground">Générez et gérez des clés API pour l'intégration avec des services externes.</p>
              </div>
              <Button variant="outline">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Gérer les clés API
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Webhooks personnalisés</h3>
                <p className="text-sm text-muted-foreground">Configurez des webhooks pour recevoir des notifications d'événements.</p>
              </div>
              <Button variant="outline">
                <Link2 className="mr-2 h-4 w-4" />
                Gérer les webhooks
              </Button>
            </div>
          </div>
          
          <div className="pt-4">
            <Button variant="outline" className="w-full">
              <Link className="mr-2 h-4 w-4" />
              Accéder à la documentation de l'API
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminIntegrations;
