
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, Plus } from 'lucide-react';
import { LinkedInTemplate } from '../types';

interface MessagesTabProps {
  templates: LinkedInTemplate[];
  onNewTemplate: () => void;
  onEditTemplate: (template: LinkedInTemplate) => void;
}

const MessagesTab: React.FC<MessagesTabProps> = ({ templates, onNewTemplate, onEditTemplate }) => {
  return (
    <>
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
                  <Button variant="outline" size="sm" onClick={() => onEditTemplate(template)}>
                    Modifier
                  </Button>
                </div>
              </Card>
            ))}
            <Card className="border border-dashed border-border/50 flex flex-col items-center justify-center p-6 h-full">
              <Button variant="outline" className="mb-2" onClick={onNewTemplate}>
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
    </>
  );
};

export default MessagesTab;
