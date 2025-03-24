
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Image,
  Check,
  Undo,
  Redo,
  Code,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  isResponsive?: boolean;
  isHtml?: boolean;
}

interface EmailTemplateEditorProps {
  template: EmailTemplate;
  onSave?: (template: EmailTemplate) => void;
  onDuplicate?: (template: EmailTemplate) => void;
  onDelete?: (id: string) => void;
  onTest?: (template: EmailTemplate) => void;
  className?: string;
  readOnly?: boolean;
}

const EmailTemplateEditor: React.FC<EmailTemplateEditorProps> = ({ 
  template,
  onSave,
  onDuplicate,
  onDelete,
  onTest,
  className,
  readOnly = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<EmailTemplate>(template);
  const [activeView, setActiveView] = useState('edit');
  const [showHtmlEditor, setShowHtmlEditor] = useState(false);
  const bodyTextareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    setCurrentTemplate(template);
  }, [template]);
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = () => {
    setIsEditing(false);
    if (onSave) {
      onSave({
        ...currentTemplate,
        updatedAt: new Date().toISOString()
      });
    }
    toast.success('Modèle enregistré avec succès');
  };
  
  const handleDuplicate = () => {
    if (onDuplicate) {
      const duplicatedTemplate = {
        ...currentTemplate,
        id: `template-${Date.now()}`,
        name: `${currentTemplate.name} (copie)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      onDuplicate(duplicatedTemplate);
      toast.success('Modèle dupliqué avec succès');
    }
  };
  
  const handleDelete = () => {
    if (onDelete && window.confirm('Êtes-vous sûr de vouloir supprimer ce modèle ?')) {
      onDelete(currentTemplate.id);
      toast.success('Modèle supprimé avec succès');
    }
  };
  
  const handleTest = () => {
    if (onTest) {
      onTest(currentTemplate);
      toast.success('Email de test envoyé');
    } else {
      toast.info('Fonctionnalité d\'envoi de test à venir');
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleInsertVariable = (variable: string) => {
    if (!isEditing) return;
    
    // Insert the variable at cursor position or at the end
    const textarea = bodyTextareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart || 0;
      const end = textarea.selectionEnd || 0;
      const text = textarea.value;
      const newText = text.substring(0, start) + variable + text.substring(end);
      
      setCurrentTemplate(prev => ({
        ...prev,
        body: newText,
        updatedAt: new Date().toISOString()
      }));
      
      // Focus the textarea and set cursor position after the inserted variable
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + variable.length, start + variable.length);
      }, 0);
    }
  };
  
  const handleApplyFormatting = (format: string) => {
    if (!isEditing || !bodyTextareaRef.current) return;
    
    const textarea = bodyTextareaRef.current;
    const start = textarea.selectionStart || 0;
    const end = textarea.selectionEnd || 0;
    const selectedText = textarea.value.substring(start, end);
    let formattedText = '';
    
    switch(format) {
      case 'bold':
        formattedText = `<strong>${selectedText}</strong>`;
        break;
      case 'italic':
        formattedText = `<em>${selectedText}</em>`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      case 'link':
        const url = prompt('Entrez l\'URL:', 'https://') || '';
        formattedText = `<a href="${url}">${selectedText || url}</a>`;
        break;
      case 'alignLeft':
        formattedText = `<div style="text-align: left;">${selectedText}</div>`;
        break;
      case 'alignCenter':
        formattedText = `<div style="text-align: center;">${selectedText}</div>`;
        break;
      case 'alignRight':
        formattedText = `<div style="text-align: right;">${selectedText}</div>`;
        break;
      case 'list':
        formattedText = `<ul>\n  <li>${selectedText}</li>\n  <li>Élément de liste</li>\n</ul>`;
        break;
      case 'orderedList':
        formattedText = `<ol>\n  <li>${selectedText}</li>\n  <li>Élément de liste</li>\n</ol>`;
        break;
      case 'image':
        const imageUrl = prompt('Entrez l\'URL de l\'image:', 'https://') || '';
        formattedText = `<img src="${imageUrl}" alt="Image" style="max-width: 100%;" />`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newText = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    
    setCurrentTemplate(prev => ({
      ...prev,
      body: newText,
      updatedAt: new Date().toISOString()
    }));
    
    // Focus the textarea and set cursor position after the inserted formatting
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };
  
  const devicePreviewClass = activeView === 'preview' ? 'max-w-full' : '';
  
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
          {!readOnly && (
            <>
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
            </>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Sujet</label>
                  <Input 
                    name="subject"
                    value={currentTemplate.subject} 
                    onChange={handleChange}
                    disabled={!isEditing || readOnly}
                    placeholder="Sujet de l'email"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Catégorie</label>
                  <Select 
                    disabled={!isEditing || readOnly}
                    value={currentTemplate.category}
                    onValueChange={(value) => setCurrentTemplate(prev => ({
                      ...prev,
                      category: value,
                      updatedAt: new Date().toISOString()
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onboarding">Onboarding</SelectItem>
                      <SelectItem value="sales">Commercial</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="meetings">Réunions</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {isEditing && !readOnly && (
                <div className="border border-border rounded-md bg-muted/30 p-1 flex flex-wrap gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded" onClick={() => handleApplyFormatting('bold')}>
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded" onClick={() => handleApplyFormatting('italic')}>
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded" onClick={() => handleApplyFormatting('underline')}>
                    <Underline className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded" onClick={() => handleApplyFormatting('link')}>
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                  <div className="w-[1px] h-6 bg-border self-center mx-1" />
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded" onClick={() => handleApplyFormatting('alignLeft')}>
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded" onClick={() => handleApplyFormatting('alignCenter')}>
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded" onClick={() => handleApplyFormatting('alignRight')}>
                    <AlignRight className="h-4 w-4" />
                  </Button>
                  <div className="w-[1px] h-6 bg-border self-center mx-1" />
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded" onClick={() => handleApplyFormatting('list')}>
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded" onClick={() => handleApplyFormatting('orderedList')}>
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded" onClick={() => handleApplyFormatting('image')}>
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded" onClick={() => setShowHtmlEditor(!showHtmlEditor)}>
                    <Code className="h-4 w-4" />
                  </Button>
                  
                  <div className="ml-auto flex">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 text-xs">
                          Variables
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass">
                        <DropdownMenuLabel>Informations personnelles</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleInsertVariable("{{prenom}}")}>
                          {"{{prenom}}"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleInsertVariable("{{nom}}")}>
                          {"{{nom}}"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Informations professionnelles</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleInsertVariable("{{entreprise}}")}>
                          {"{{entreprise}}"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleInsertVariable("{{poste}}")}>
                          {"{{poste}}"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Autres</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleInsertVariable("{{date}}")}>
                          {"{{date}}"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleInsertVariable("{{lien_rendez_vous}}")}>
                          {"{{lien_rendez_vous}}"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleInsertVariable("{{signature}}")}>
                          {"{{signature}}"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium mb-1.5 block">Contenu</label>
                {showHtmlEditor ? (
                  <Textarea 
                    name="body"
                    ref={bodyTextareaRef}
                    value={currentTemplate.body} 
                    onChange={handleChange}
                    disabled={!isEditing || readOnly}
                    placeholder="Contenu HTML de l'email"
                    className="min-h-[300px] font-mono"
                  />
                ) : (
                  <Textarea 
                    name="body"
                    ref={bodyTextareaRef}
                    value={currentTemplate.body} 
                    onChange={handleChange}
                    disabled={!isEditing || readOnly}
                    placeholder="Contenu de l'email"
                    className="min-h-[300px]"
                  />
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview">
            <div className="mt-4 space-y-4">
              <div className="border border-border rounded-md p-3 bg-muted/30">
                <p className="font-medium">Sujet: {currentTemplate.subject}</p>
              </div>
              
              <div className="flex justify-center mb-4">
                <div className="flex space-x-2 border border-border rounded-md p-1 bg-muted/30">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={cn("text-xs", devicePreviewClass === 'max-w-full' && "bg-primary/10")}
                    onClick={() => setActiveView('preview')}
                  >
                    <Computer className="h-4 w-4 mr-1" />
                    Desktop
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-xs"
                    onClick={() => setActiveView('preview-tablet')}
                  >
                    <Tablet className="h-4 w-4 mr-1" />
                    Tablette
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-xs"
                    onClick={() => setActiveView('preview-mobile')}
                  >
                    <Smartphone className="h-4 w-4 mr-1" />
                    Mobile
                  </Button>
                </div>
              </div>
              
              <div className={`border border-border rounded-md p-6 min-h-[300px] whitespace-pre-line ${devicePreviewClass}`}>
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
        
        {!readOnly && (
          <div className="flex justify-between mt-6 pt-4 border-t border-border">
            <Button variant="outline" className="gap-2" onClick={handleDuplicate}>
              <Copy className="h-4 w-4" />
              <span>Dupliquer</span>
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/10 gap-2" onClick={handleDelete}>
                <Trash className="h-4 w-4" />
                <span>Supprimer</span>
              </Button>
              
              <Button className="gap-2" onClick={handleTest}>
                <Send className="h-4 w-4" />
                <span>Envoyer test</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Add these missing components
const Computer = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

const Tablet = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

const Smartphone = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

export default EmailTemplateEditor;
