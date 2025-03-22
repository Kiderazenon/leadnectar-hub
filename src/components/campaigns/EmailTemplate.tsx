
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Edit, 
  Save, 
  Clock, 
  Send, 
  Copy, 
  Trash,
  Bold,
  Italic,
  Underline,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Image
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

interface EmailTemplateProps {
  template?: {
    id: string;
    name: string;
    subject: string;
    body: string;
    createdAt: string;
    updatedAt: string;
  };
  className?: string;
}

const defaultTemplate = {
  id: 'new',
  name: 'Nouveau modèle',
  subject: 'Sujet du mail',
  body: `Bonjour {{prenom}},

J'espère que vous allez bien. Je vous contacte car je pense que {{entreprise}} pourrait être intéressé(e) par notre solution.

Notre plateforme aide les entreprises comme {{entreprise}} à améliorer leur productivité de 30% en moyenne.

Seriez-vous disponible pour un appel de 15 minutes cette semaine pour en discuter ?

Cordialement,
{{signature}}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const EmailTemplate: React.FC<EmailTemplateProps> = ({ 
  template = defaultTemplate,
  className
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(template);
  const [activeView, setActiveView] = useState('edit');
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = () => {
    setIsEditing(false);
    // Would save the template to the backend in a real app
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentTemplate(prev => ({
      ...prev,
      [name]: value,
      updatedAt: new Date().toISOString()
    }));
  };
  
  const formatVariable = (text: string) => {
    return text.replace(/\{\{([^}]+)\}\}/g, '<span class="text-primary font-medium">{{$1}}</span>');
  };
  
  return (
    <Card className={cn("glass-card border border-border/50 animate-scale-in", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">
          {isEditing ? (
            <Input 
              name="name"
              value={currentTemplate.name} 
              onChange={handleChange}
              className="font-semibold px-0 border-0 text-xl focus-visible:ring-0"
            />
          ) : (
            currentTemplate.name
          )}
        </CardTitle>
        
        <div className="flex items-center gap-2">
          {isEditing ? (
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              <span>Enregistrer</span>
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-1" />
              <span>Modifier</span>
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Clock className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass">
              <div className="p-2 text-xs text-muted-foreground">
                <div>Créé le: {new Date(currentTemplate.createdAt).toLocaleDateString('fr-FR')}</div>
                <div>Modifié le: {new Date(currentTemplate.updatedAt).toLocaleDateString('fr-FR')}</div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="edit" value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Modifier</TabsTrigger>
            <TabsTrigger value="preview">Aperçu</TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit">
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Sujet</label>
                <Input 
                  name="subject"
                  value={currentTemplate.subject} 
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Sujet de l'email"
                />
              </div>
              
              {isEditing && (
                <div className="border border-border rounded-md bg-muted/30 p-1 flex flex-wrap gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded">
                    <Underline className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded">
                    <Link className="h-4 w-4" />
                  </Button>
                  <div className="w-[1px] h-6 bg-border self-center mx-1" />
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded">
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded">
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded">
                    <AlignRight className="h-4 w-4" />
                  </Button>
                  <div className="w-[1px] h-6 bg-border self-center mx-1" />
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded">
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded">
                    <Image className="h-4 w-4" />
                  </Button>
                  
                  <div className="ml-auto flex">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 text-xs">
                          Variables
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass">
                        <DropdownMenuItem className="cursor-pointer">
                          {{prenom}}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          {{nom}}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          {{entreprise}}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          {{poste}}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          {{signature}}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium mb-1.5 block">Contenu</label>
                <Textarea 
                  name="body"
                  value={currentTemplate.body} 
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Contenu de l'email"
                  className="min-h-[300px] font-mono"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview">
            <div className="mt-4 space-y-4">
              <div className="border border-border rounded-md p-3 bg-muted/30">
                <p className="font-medium">Sujet: {currentTemplate.subject}</p>
              </div>
              
              <div className="border border-border rounded-md p-6 min-h-[300px] whitespace-pre-line">
                <div 
                  className="prose max-w-none" 
                  dangerouslySetInnerHTML={{ 
                    __html: formatVariable(currentTemplate.body) 
                  }} 
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between mt-6 pt-4 border-t border-border">
          <Button variant="outline" className="gap-2">
            <Copy className="h-4 w-4" />
            <span>Dupliquer</span>
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/10 gap-2">
              <Trash className="h-4 w-4" />
              <span>Supprimer</span>
            </Button>
            
            <Button className="gap-2">
              <Send className="h-4 w-4" />
              <span>Envoyer test</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailTemplate;
