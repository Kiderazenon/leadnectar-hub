
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { 
  Globe, 
  Mail, 
  Shield, 
  FileJson, 
  RefreshCcw, 
  Database, 
  Download, 
  UploadCloud 
} from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [generalSettings, setGeneralSettings] = useState({
    appName: 'LeadNectar',
    appUrl: 'https://app.leadnectar.com',
    companyName: 'LeadNectar SAS',
    supportEmail: 'support@leadnectar.com',
    defaultLanguage: 'fr',
    defaultTimezone: 'Europe/Paris'
  });
  
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.sendgrid.net',
    smtpPort: '587',
    smtpUsername: 'apikey',
    smtpPassword: '••••••••••••••••',
    fromEmail: 'notifications@leadnectar.com',
    fromName: 'LeadNectar',
    enableSsl: true
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireNumber: true,
    passwordRequireSymbol: true,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    twoFactorAuth: false,
    ipRestriction: false
  });
  
  const handleSaveGeneral = () => {
    toast.success('Paramètres généraux enregistrés avec succès');
  };
  
  const handleSaveEmail = () => {
    toast.success('Paramètres email enregistrés avec succès');
  };
  
  const handleSaveSecurity = () => {
    toast.success('Paramètres de sécurité enregistrés avec succès');
  };
  
  const handleExportData = () => {
    toast.success('Export des données initié. Vous recevrez un email quand il sera prêt.');
  };
  
  const handleImportData = () => {
    // Simulation d'ouverture de dialogue de fichier
    toast.info('Veuillez sélectionner un fichier à importer');
  };
  
  const handleClearCache = () => {
    toast.success('Cache système vidé avec succès');
  };
  
  return (
    <div className="space-y-6">
      <Card className="glass-card border border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle>Paramètres généraux</CardTitle>
          </div>
          <CardDescription>
            Configuration générale de l'application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appName">Nom de l'application</Label>
              <Input 
                id="appName" 
                value={generalSettings.appName}
                onChange={(e) => setGeneralSettings({...generalSettings, appName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appUrl">URL de l'application</Label>
              <Input 
                id="appUrl" 
                value={generalSettings.appUrl}
                onChange={(e) => setGeneralSettings({...generalSettings, appUrl: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Nom de l'entreprise</Label>
              <Input 
                id="companyName" 
                value={generalSettings.companyName}
                onChange={(e) => setGeneralSettings({...generalSettings, companyName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Email de support</Label>
              <Input 
                id="supportEmail" 
                type="email"
                value={generalSettings.supportEmail}
                onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultLanguage">Langue par défaut</Label>
              <select 
                id="defaultLanguage" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={generalSettings.defaultLanguage}
                onChange={(e) => setGeneralSettings({...generalSettings, defaultLanguage: e.target.value})}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultTimezone">Fuseau horaire par défaut</Label>
              <select 
                id="defaultTimezone" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={generalSettings.defaultTimezone}
                onChange={(e) => setGeneralSettings({...generalSettings, defaultTimezone: e.target.value})}
              >
                <option value="Europe/Paris">Europe/Paris</option>
                <option value="Europe/London">Europe/London</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSaveGeneral}>Enregistrer</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card border border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <CardTitle>Configuration des emails</CardTitle>
          </div>
          <CardDescription>
            Paramètres pour l'envoi d'emails
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtpHost">Serveur SMTP</Label>
              <Input 
                id="smtpHost" 
                value={emailSettings.smtpHost}
                onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPort">Port SMTP</Label>
              <Input 
                id="smtpPort" 
                value={emailSettings.smtpPort}
                onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpUsername">Nom d'utilisateur SMTP</Label>
              <Input 
                id="smtpUsername" 
                value={emailSettings.smtpUsername}
                onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPassword">Mot de passe SMTP</Label>
              <Input 
                id="smtpPassword" 
                type="password"
                value={emailSettings.smtpPassword}
                onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fromEmail">Email d'expédition</Label>
              <Input 
                id="fromEmail" 
                type="email"
                value={emailSettings.fromEmail}
                onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fromName">Nom d'expéditeur</Label>
              <Input 
                id="fromName" 
                value={emailSettings.fromName}
                onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
              />
            </div>
            <div className="col-span-2 flex items-center space-x-2">
              <Switch 
                id="enableSsl" 
                checked={emailSettings.enableSsl}
                onCheckedChange={(checked) => setEmailSettings({...emailSettings, enableSsl: checked})}
              />
              <Label htmlFor="enableSsl">Activer la connexion SSL/TLS</Label>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Tester la connexion</Button>
            <Button onClick={handleSaveEmail}>Enregistrer</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card border border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Sécurité</CardTitle>
          </div>
          <CardDescription>
            Paramètres de sécurité de l'application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="passwordMinLength">Longueur minimale des mots de passe</Label>
              <Input 
                id="passwordMinLength" 
                type="number"
                value={securitySettings.passwordMinLength}
                onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Durée de session (minutes)</Label>
              <Input 
                id="sessionTimeout" 
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxLoginAttempts">Tentatives de connexion max</Label>
              <Input 
                id="maxLoginAttempts" 
                type="number"
                value={securitySettings.maxLoginAttempts}
                onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-4 col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Complexité des mots de passe</h4>
                  <p className="text-sm text-muted-foreground">Exigences pour les mots de passe</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="passwordRequireUppercase" 
                      checked={securitySettings.passwordRequireUppercase}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, passwordRequireUppercase: checked})}
                    />
                    <Label htmlFor="passwordRequireUppercase">Majuscules requises</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="passwordRequireNumber" 
                      checked={securitySettings.passwordRequireNumber}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, passwordRequireNumber: checked})}
                    />
                    <Label htmlFor="passwordRequireNumber">Chiffres requis</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="passwordRequireSymbol" 
                      checked={securitySettings.passwordRequireSymbol}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, passwordRequireSymbol: checked})}
                    />
                    <Label htmlFor="passwordRequireSymbol">Symboles requis</Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 flex items-center justify-between">
              <div>
                <h4 className="font-medium">Authentification à deux facteurs</h4>
                <p className="text-sm text-muted-foreground">Exiger l'authentification à deux facteurs pour tous les utilisateurs</p>
              </div>
              <Switch 
                id="twoFactorAuth" 
                checked={securitySettings.twoFactorAuth}
                onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
              />
            </div>
            <div className="col-span-2 flex items-center justify-between">
              <div>
                <h4 className="font-medium">Restriction d'IP</h4>
                <p className="text-sm text-muted-foreground">Limiter l'accès à des adresses IP spécifiques</p>
              </div>
              <Switch 
                id="ipRestriction" 
                checked={securitySettings.ipRestriction}
                onCheckedChange={(checked) => setSecuritySettings({...securitySettings, ipRestriction: checked})}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSaveSecurity}>Enregistrer</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card border border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <CardTitle>Maintenance du système</CardTitle>
          </div>
          <CardDescription>
            Outils de maintenance et gestion des données
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Exporter les données</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Exportez toutes les données de l'application au format JSON pour la sauvegarde ou la migration.
                </p>
                <Button 
                  className="w-full"
                  onClick={handleExportData}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Importer des données</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Importez des données à partir d'un fichier JSON précédemment exporté.
                </p>
                <Button 
                  className="w-full"
                  onClick={handleImportData}
                >
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Importer
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Cache système</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Effacez le cache système pour résoudre les problèmes de performance ou d'affichage.
                </p>
                <Button 
                  className="w-full"
                  onClick={handleClearCache}
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Vider le cache
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
