
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Search, Clock, Check, Mail, ChevronRight, FileText } from 'lucide-react';
import { EmailTemplate } from './EmailTemplateEditor';
import EmailTemplateEditor from './EmailTemplateEditor';
import { cn } from '@/lib/utils';

// Catégories de templates avec leurs couleurs
const categories = [
  { id: 'all', name: 'Tous', color: 'default' },
  { id: 'onboarding', name: 'Onboarding', color: 'default' },
  { id: 'sales', name: 'Commercial', color: 'secondary' },
  { id: 'marketing', name: 'Marketing', color: 'destructive' },
  { id: 'meetings', name: 'Réunions', color: 'primary' },
  { id: 'support', name: 'Support', color: 'outline' }
];

// Templates prédéfinis
const defaultTemplates: EmailTemplate[] = [
  {
    id: 'template-1',
    name: 'Email de bienvenue',
    subject: 'Bienvenue chez LeadNectar',
    category: 'onboarding',
    body: `
<!DOCTYPE html>
<html>
<head>
  <title>Bienvenue chez LeadNectar</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 20px 0; }
    .logo { max-width: 150px; }
    .content { padding: 20px 0; }
    .button { display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 4px; }
    .footer { text-align: center; padding: 20px 0; font-size: 12px; color: #777; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>LeadNectar</h1>
    </div>
    <div class="content">
      <h2>Bonjour {{prenom}},</h2>
      <p>Nous sommes ravis de vous accueillir sur LeadNectar, votre nouvelle plateforme de gestion de la relation client.</p>
      <p>Vous pouvez dès maintenant commencer à :</p>
      <ul>
        <li>Créer et gérer vos contacts</li>
        <li>Organiser vos campagnes marketing</li>
        <li>Suivre vos prospects et opportunités</li>
        <li>Analyser vos performances commerciales</li>
      </ul>
      <p style="text-align: center; margin: 30px 0;">
        <a href="#" class="button">Accéder à mon compte</a>
      </p>
      <p>Si vous avez des questions, n'hésitez pas à contacter notre équipe de support.</p>
      <p>Cordialement,<br>L'équipe LeadNectar</p>
    </div>
    <div class="footer">
      <p>© 2023 LeadNectar. Tous droits réservés.</p>
      <p>Vous recevez cet email car vous vous êtes inscrit sur notre plateforme.</p>
    </div>
  </div>
</body>
</html>
    `,
    createdAt: '2023-10-15T09:00:00Z',
    updatedAt: '2023-10-15T09:00:00Z',
    isResponsive: true,
    isHtml: true
  },
  {
    id: 'template-2',
    name: 'Suivi de rendez-vous',
    subject: 'Merci pour notre échange, {{prenom}}',
    category: 'meetings',
    body: `<!DOCTYPE html>
<html>
<head>
  <title>Suivi de notre rendez-vous</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { padding: 20px 0; }
    .content { padding: 20px 0; }
    .button { display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 4px; }
    .footer { padding: 20px 0; font-size: 12px; color: #777; border-top: 1px solid #eee; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Merci pour notre conversation</h2>
    </div>
    <div class="content">
      <p>Bonjour {{prenom}},</p>
      <p>Je tenais à vous remercier pour notre échange d'aujourd'hui. J'ai été ravi d'en apprendre plus sur {{entreprise}} et vos besoins spécifiques.</p>
      <p>Comme promis, je vous envoie le document de présentation contenant les informations dont nous avons discuté.</p>
      <p>Pour la suite, je vous propose de planifier une démo personnalisée de notre solution :</p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="{{lien_rendez_vous}}" class="button">Réserver une démo</a>
      </p>
      <p>N'hésitez pas à me contacter si vous avez des questions supplémentaires.</p>
      <p>Bien cordialement,<br>{{signature}}</p>
    </div>
    <div class="footer">
      <p>LeadNectar - Votre partenaire CRM</p>
    </div>
  </div>
</body>
</html>`,
    createdAt: '2023-10-18T14:30:00Z',
    updatedAt: '2023-10-18T14:30:00Z',
    isResponsive: true,
    isHtml: true
  },
  {
    id: 'template-3',
    name: 'Relance commerciale',
    subject: 'Une offre exceptionnelle pour {{entreprise}}',
    category: 'sales',
    body: `<!DOCTYPE html>
<html>
<head>
  <title>Offre spéciale</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .offer { background-color: #f0f4ff; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #4F46E5; }
    .button { display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; }
    .footer { padding: 20px; font-size: 12px; color: #777; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Offre exclusive pour {{entreprise}}</h2>
    </div>
    <div class="content">
      <p>Bonjour {{prenom}},</p>
      <p>J'espère que tout se passe bien de votre côté.</p>
      <p>Suite à notre précédent échange, je voulais vous faire part d'une offre spéciale que nous proposons actuellement :</p>
      
      <div class="offer">
        <h3>Offre Spéciale : -20% sur tous nos plans annuels</h3>
        <p>Cette offre est valable jusqu'au 31 décembre et inclut :</p>
        <ul>
          <li>Accès complet à toutes les fonctionnalités premium</li>
          <li>Onboarding personnalisé avec un expert</li>
          <li>Support prioritaire</li>
        </ul>
      </div>
      
      <p>Cette offre est particulièrement adaptée aux besoins que vous avez exprimés lors de notre conversation.</p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="#" class="button">Profiter de l'offre</a>
      </p>
      <p>Je reste disponible pour répondre à vos questions et vous accompagner dans cette démarche.</p>
      <p>Cordialement,<br>{{signature}}</p>
    </div>
    <div class="footer">
      <p>Cette offre est soumise à nos conditions générales de vente.</p>
      <p>LeadNectar - Solutions CRM intelligentes</p>
    </div>
  </div>
</body>
</html>`,
    createdAt: '2023-10-20T11:15:00Z',
    updatedAt: '2023-10-20T11:15:00Z',
    isResponsive: true,
    isHtml: true
  }
];

interface EmailTemplateLibraryProps {
  onSelectTemplate?: (template: EmailTemplate) => void;
  className?: string;
}

const EmailTemplateLibrary: React.FC<EmailTemplateLibraryProps> = ({ 
  onSelectTemplate,
  className 
}) => {
  const [templates, setTemplates] = useState<EmailTemplate[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Filtrer les templates par recherche et catégorie
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleSelectTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
  };
  
  const handleCreateTemplate = () => {
    const newTemplate: EmailTemplate = {
      id: `template-${Date.now()}`,
      name: 'Nouveau modèle',
      subject: 'Sujet du mail',
      category: 'sales',
      body: `<!DOCTYPE html>
<html>
<head>
  <title>Mon modèle</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <p>Bonjour {{prenom}},</p>
    <p>Le contenu de mon email...</p>
    <p>Cordialement,<br>{{signature}}</p>
  </div>
</body>
</html>`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isResponsive: true,
      isHtml: true
    };
    
    setTemplates([...templates, newTemplate]);
    setSelectedTemplate(newTemplate);
  };
  
  const handleSaveTemplate = (updatedTemplate: EmailTemplate) => {
    setTemplates(templates.map(t => 
      t.id === updatedTemplate.id ? updatedTemplate : t
    ));
  };
  
  const handleDuplicateTemplate = (duplicatedTemplate: EmailTemplate) => {
    setTemplates([...templates, duplicatedTemplate]);
    setSelectedTemplate(duplicatedTemplate);
  };
  
  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    if (selectedTemplate?.id === id) {
      setSelectedTemplate(null);
    }
  };
  
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-3 gap-6", className)}>
      <Card className="col-span-1 glass-card border border-border/50">
        <CardHeader>
          <CardTitle>Bibliothèque de modèles</CardTitle>
          <CardDescription>
            Sélectionnez ou créez un modèle d'email
          </CardDescription>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un modèle..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2 flex-wrap">
            {categories.map(category => (
              <Badge 
                key={category.id} 
                variant={categoryFilter === category.id ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setCategoryFilter(category.id)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
          
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {filteredTemplates.map(template => (
                <div 
                  key={template.id}
                  className={cn(
                    "p-3 rounded-md border border-border/50 hover:border-primary/50 cursor-pointer transition-all",
                    selectedTemplate?.id === template.id && "border-primary/50 bg-primary/5"
                  )}
                  onClick={() => handleSelectTemplate(template)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-sm">{template.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {template.category === 'onboarding' ? 'Onboarding' : 
                       template.category === 'sales' ? 'Commercial' :
                       template.category === 'marketing' ? 'Marketing' :
                       template.category === 'meetings' ? 'Réunions' : 'Support'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{template.subject}</p>
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Modifié le {new Date(template.updatedAt).toLocaleDateString('fr-FR')}</span>
                    {template.isHtml && (
                      <Badge variant="outline" className="ml-auto text-[10px] h-5">HTML</Badge>
                    )}
                  </div>
                </div>
              ))}
              
              <div 
                className="p-3 rounded-md border border-dashed border-border/50 hover:border-primary/50 cursor-pointer transition-all flex items-center justify-center"
                onClick={handleCreateTemplate}
              >
                <Plus className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Créer un nouveau modèle</span>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      <div className="col-span-1 lg:col-span-2">
        {selectedTemplate ? (
          <EmailTemplateEditor 
            template={selectedTemplate}
            onSave={handleSaveTemplate}
            onDuplicate={handleDuplicateTemplate}
            onDelete={handleDeleteTemplate}
          />
        ) : (
          <Card className="h-full flex flex-col justify-center items-center p-8 text-center glass-card border border-border/50">
            <div className="mb-4 p-3 rounded-full bg-primary/10">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Aucun modèle sélectionné</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Sélectionnez un modèle depuis la bibliothèque ou créez-en un nouveau pour commencer à éditer.
            </p>
            <Button onClick={handleCreateTemplate}>
              <Plus className="h-4 w-4 mr-2" />
              Créer un nouveau modèle
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EmailTemplateLibrary;
