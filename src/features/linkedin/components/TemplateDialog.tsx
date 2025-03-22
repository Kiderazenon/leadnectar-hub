
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { LinkedInTemplate } from '../types';

interface TemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTemplate: Partial<LinkedInTemplate> | null;
  onSave: () => void;
  isNewTemplate: boolean;
  setCurrentTemplate: (template: Partial<LinkedInTemplate>) => void;
}

const TemplateDialog: React.FC<TemplateDialogProps> = ({
  open,
  onOpenChange,
  currentTemplate,
  onSave,
  isNewTemplate,
  setCurrentTemplate
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isNewTemplate ? 'Créer un nouveau modèle' : 'Modifier le modèle'}
          </DialogTitle>
          <DialogDescription>
            Personnalisez votre modèle de message LinkedIn. Utilisez {"{{variable}}"} pour les variables dynamiques.
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
              onChange={(e) => setCurrentTemplate({...currentTemplate, type: e.target.value as 'connection' | 'follow-up' | 'pitch'})}
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
              {"{{first_name}}"}
            </Badge>
            <Badge variant="outline" className="cursor-pointer"
              onClick={() => setCurrentTemplate({
                ...currentTemplate, 
                content: (currentTemplate?.content || '') + '{{last_name}}'
              })}
            >
              {"{{last_name}}"}
            </Badge>
            <Badge variant="outline" className="cursor-pointer"
              onClick={() => setCurrentTemplate({
                ...currentTemplate, 
                content: (currentTemplate?.content || '') + '{{company}}'
              })}
            >
              {"{{company}}"}
            </Badge>
            <Badge variant="outline" className="cursor-pointer"
              onClick={() => setCurrentTemplate({
                ...currentTemplate, 
                content: (currentTemplate?.content || '') + '{{position}}'
              })}
            >
              {"{{position}}"}
            </Badge>
            <Badge variant="outline" className="cursor-pointer"
              onClick={() => setCurrentTemplate({
                ...currentTemplate, 
                content: (currentTemplate?.content || '') + '{{topic}}'
              })}
            >
              {"{{topic}}"}
            </Badge>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={onSave}>
            {isNewTemplate ? 'Créer' : 'Enregistrer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDialog;
