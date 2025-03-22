
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Edit, Trash, Copy, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Mock data for email templates
const mockTemplates = [
  {
    id: '1',
    name: 'Bienvenue',
    subject: 'Bienvenue sur LeadNectar',
    category: 'onboarding',
    lastModified: '2023-05-10T14:30:00'
  },
  {
    id: '2',
    name: 'Relance prospect',
    subject: 'Suite à notre précédent échange',
    category: 'sales',
    lastModified: '2023-05-12T09:45:00'
  },
  {
    id: '3',
    name: 'Confirmation de rendez-vous',
    subject: 'Confirmation de notre rendez-vous',
    category: 'meetings',
    lastModified: '2023-05-09T16:20:00'
  },
  {
    id: '4',
    name: 'Offre spéciale',
    subject: 'Offre exclusive pour vous',
    category: 'marketing',
    lastModified: '2023-05-11T11:15:00'
  }
];

const AdminEmailTemplates: React.FC = () => {
  const [templates, setTemplates] = useState(mockTemplates);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [isNewTemplate, setIsNewTemplate] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [templateContent, setTemplateContent] = useState('');
  
  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleEditTemplate = (template: any) => {
    setEditingTemplate(template);
    setIsNewTemplate(false);
    setTemplateContent(`
<!DOCTYPE html>
<html>
<head>
  <title>${template.subject}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 20px 0; }
    .footer { text-align: center; padding: 20px 0; font-size: 12px; color: #777; }
    .btn { display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>LeadNectar</h1>
    </div>
    <p>Bonjour {{first_name}},</p>
    <p>Ceci est un exemple de modèle pour "${template.name}".</p>
    <p>Vous pouvez personnaliser ce contenu selon vos besoins.</p>
    <p style="text-align: center; margin: 30px 0;">
      <a href="{{action_url}}" class="btn">Cliquez ici</a>
    </p>
    <p>Cordialement,<br>L'équipe LeadNectar</p>
    <div class="footer">
      <p>© 2023 LeadNectar. Tous droits réservés.</p>
      <p>{{unsubscribe_link}}</p>
    </div>
  </div>
</body>
</html>
    `);
    setIsDialogOpen(true);
  };
  
  const handleNewTemplate = () => {
    setEditingTemplate({
      id: '',
      name: '',
      subject: '',
      category: 'sales',
      lastModified: new Date().toISOString()
    });
    setIsNewTemplate(true);
    setTemplateContent(`
<!DOCTYPE html>
<html>
<head>
  <title>Nouveau modèle</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 20px 0; }
    .footer { text-align: center; padding: 20px 0; font-size: 12px; color: #777; }
    .btn { display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>LeadNectar</h1>
    </div>
    <p>Bonjour {{first_name}},</p>
    <p>Ceci est un exemple de modèle.</p>
    <p>Vous pouvez personnaliser ce contenu selon vos besoins.</p>
    <p style="text-align: center; margin: 30px 0;">
      <a href="{{action_url}}" class="btn">Cliquez ici</a>
    </p>
    <p>Cordialement,<br>L'équipe LeadNectar</p>
    <div class="footer">
      <p>© 2023 LeadNectar. Tous droits réservés.</p>
      <p>{{unsubscribe_link}}</p>
    </div>
  </div>
</body>
</html>
    `);
    setIsDialogOpen(true);
  };
  
  const handleDeleteTemplate = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce modèle d\'email ?')) {
      setTemplates(templates.filter(template => template.id !== id));
      toast.success('Modèle supprimé avec succès');
    }
  };
  
  const handleDuplicateTemplate = (template: any) => {
    const newTemplate = {
      ...template,
      id: `template-${Date.now()}`,
      name: `${template.name} (copie)`,
      lastModified: new Date().toISOString()
    };
    
    setTemplates([...templates, newTemplate]);
    toast.success('Modèle dupliqué avec succès');
  };
  
  const handleSaveTemplate = () => {
    if (isNewTemplate) {
      const newTemplate = {
        ...editingTemplate,
        id: `template-${Date.now()}`,
        lastModified: new Date().toISOString()
      };
      setTemplates([...templates, newTemplate]);
      toast.success('Nouveau modèle créé avec succès');
    } else {
      setTemplates(templates.map(template => 
        template.id === editingTemplate.id ? 
        {...editingTemplate, lastModified: new Date().toISOString()} : 
        template
      ));
      toast.success('Modèle mis à jour avec succès');
    }
    setIsDialogOpen(false);
  };
  
  return (
    <>
      <Card className="glass-card border border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Modèles d'emails</CardTitle>
            <Button onClick={handleNewTemplate}>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau modèle
            </Button>
          </div>
          <CardDescription>
            Gérez vos modèles d'emails pour différentes situations.
          </CardDescription>
          <div className="relative w-full max-w-sm">
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Objet</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Dernière modification</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.map(template => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>{template.subject}</TableCell>
                  <TableCell>
                    <Badge variant={
                      template.category === 'onboarding' ? 'default' :
                      template.category === 'sales' ? 'secondary' :
                      template.category === 'marketing' ? 'destructive' : 'outline'
                    }>
                      {template.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(template.lastModified).toLocaleString('fr-FR')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEditTemplate(template)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDuplicateTemplate(template)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteTemplate(template.id)}>
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>
              {isNewTemplate ? 'Créer un nouveau modèle' : 'Modifier le modèle'}
            </DialogTitle>
            <DialogDescription>
              Personnalisez le modèle selon vos besoins. Utilisez les variables entre doubles accolades {{variable}}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Nom du modèle</Label>
                <Input 
                  id="template-name"
                  value={editingTemplate?.name || ''}
                  onChange={(e) => setEditingTemplate({...editingTemplate, name: e.target.value})}
                  placeholder="Ex: Bienvenue client"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-category">Catégorie</Label>
                <select 
                  id="template-category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={editingTemplate?.category || 'sales'}
                  onChange={(e) => setEditingTemplate({...editingTemplate, category: e.target.value})}
                >
                  <option value="onboarding">Onboarding</option>
                  <option value="sales">Commercial</option>
                  <option value="marketing">Marketing</option>
                  <option value="meetings">Réunions</option>
                  <option value="support">Support</option>
                </select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="template-subject">Objet de l'email</Label>
                <Input 
                  id="template-subject"
                  value={editingTemplate?.subject || ''}
                  onChange={(e) => setEditingTemplate({...editingTemplate, subject: e.target.value})}
                  placeholder="Ex: Bienvenue chez LeadNectar!"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="template-content">Contenu HTML</Label>
                <div className="border rounded-md">
                  <Textarea 
                    id="template-content"
                    value={templateContent}
                    onChange={(e) => setTemplateContent(e.target.value)}
                    className="font-mono text-xs h-96"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="font-medium">Variables disponibles:</span>
                  <Badge variant="outline">{{first_name}}</Badge>
                  <Badge variant="outline">{{last_name}}</Badge>
                  <Badge variant="outline">{{company}}</Badge>
                  <Badge variant="outline">{{action_url}}</Badge>
                  <Badge variant="outline">{{unsubscribe_link}}</Badge>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveTemplate}>
              {isNewTemplate ? 'Créer' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminEmailTemplates;
