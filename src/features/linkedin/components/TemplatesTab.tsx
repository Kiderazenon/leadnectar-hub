
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { LinkedInTemplate } from '../types';

interface TemplatesTabProps {
  templates: LinkedInTemplate[];
  onNewTemplate: () => void;
  onEditTemplate: (template: LinkedInTemplate) => void;
  onDeleteTemplate: (id: string) => void;
}

const TemplatesTab: React.FC<TemplatesTabProps> = ({ 
  templates, 
  onNewTemplate, 
  onEditTemplate, 
  onDeleteTemplate 
}) => {
  return (
    <Card className="glass-card border border-border/50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Modèles de messages</CardTitle>
          <Button onClick={onNewTemplate}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau modèle
          </Button>
        </div>
        <CardDescription>
          Gérez vos modèles pour les différentes étapes de votre prospection LinkedIn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Contenu</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map(template => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">{template.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {template.type === 'connection' ? 'Invitation' : 
                     template.type === 'follow-up' ? 'Suivi' : 'Présentation'}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[400px]">
                  <p className="truncate">{template.content}</p>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEditTemplate(template)}>
                      Modifier
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-destructive" 
                      onClick={() => onDeleteTemplate(template.id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TemplatesTab;
