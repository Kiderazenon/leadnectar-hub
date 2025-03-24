
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash, Edit, ChevronRight, ChevronDown, Settings, Mail, Calendar, Clock, ArrowRight, Play, Pause, Save, Sparkles, Copy as CopyIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { EmailTemplate } from './EmailTemplateEditor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  DragDropContext, 
  Droppable, 
  Draggable,
  DropResult 
} from 'react-beautiful-dnd';

// Définir l'interface pour un step d'une séquence
export interface SequenceStep {
  id: string;
  type: 'email' | 'delay' | 'condition';
  name: string;
  description?: string;
  content?: string;
  templateId?: string;
  delay?: {
    value: number;
    unit: 'minutes' | 'hours' | 'days';
  };
  condition?: {
    type: 'email_opened' | 'email_clicked' | 'custom';
    value: string;
    targetStepId?: string;
  };
}

// Définir l'interface pour une séquence
export interface EmailSequence {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  trigger: 'manual' | 'automatic';
  triggerCondition?: string;
  steps: SequenceStep[];
  createdAt: string;
  updatedAt: string;
}

// Templates prédéfinis pour utilisation dans la séquence
const availableTemplates: EmailTemplate[] = [
  {
    id: 'template-1',
    name: 'Email de bienvenue',
    subject: 'Bienvenue chez LeadNectar',
    category: 'onboarding',
    body: 'Bonjour {{prenom}}, Bienvenue chez LeadNectar...',
    createdAt: '2023-10-15T09:00:00Z',
    updatedAt: '2023-10-15T09:00:00Z',
  },
  {
    id: 'template-2',
    name: 'Suivi de rendez-vous',
    subject: 'Merci pour notre échange, {{prenom}}',
    category: 'meetings',
    body: 'Bonjour {{prenom}}, Je tenais à vous remercier pour notre conversation...',
    createdAt: '2023-10-18T14:30:00Z',
    updatedAt: '2023-10-18T14:30:00Z',
  },
  {
    id: 'template-3',
    name: 'Relance commerciale',
    subject: 'Une offre exceptionnelle pour {{entreprise}}',
    category: 'sales',
    body: 'Bonjour {{prenom}}, J\'espère que tout se passe bien de votre côté...',
    createdAt: '2023-10-20T11:15:00Z',
    updatedAt: '2023-10-20T11:15:00Z',
  }
];

// Exemples de séquences prédéfinies
const defaultSequences: EmailSequence[] = [
  {
    id: 'sequence-1',
    name: 'Séquence initiale',
    description: 'Première approche de prospects',
    status: 'active',
    trigger: 'manual',
    steps: [
      {
        id: 'step-1',
        type: 'email',
        name: 'Présentation initiale',
        templateId: 'template-1',
      },
      {
        id: 'step-2',
        type: 'delay',
        name: 'Attente de 3 jours',
        delay: {
          value: 3,
          unit: 'days'
        }
      },
      {
        id: 'step-3',
        type: 'email',
        name: 'Premier suivi',
        templateId: 'template-2',
      },
      {
        id: 'step-4',
        type: 'delay',
        name: 'Attente de 6 jours',
        delay: {
          value: 6,
          unit: 'days'
        }
      },
      {
        id: 'step-5',
        type: 'email',
        name: 'Proposition valeur',
        templateId: 'template-3',
      }
    ],
    createdAt: '2023-11-01T10:00:00Z',
    updatedAt: '2023-11-05T14:30:00Z'
  },
  {
    id: 'sequence-2',
    name: 'Suivi après salon',
    description: 'Pour les contacts rencontrés en événement',
    status: 'draft',
    trigger: 'manual',
    steps: [
      {
        id: 'step-1',
        type: 'email',
        name: 'Rappel de rencontre',
        templateId: 'template-2',
      },
      {
        id: 'step-2',
        type: 'delay',
        name: 'Attente de 2 jours',
        delay: {
          value: 2,
          unit: 'days'
        }
      },
      {
        id: 'step-3',
        type: 'email',
        name: 'Document promis',
        templateId: 'template-3',
      },
      {
        id: 'step-4',
        type: 'delay',
        name: 'Attente de 5 jours',
        delay: {
          value: 5,
          unit: 'days'
        }
      },
      {
        id: 'step-5',
        type: 'condition',
        name: 'Vérifier ouverture email',
        condition: {
          type: 'email_opened',
          value: 'true',
          targetStepId: 'step-7'
        }
      },
      {
        id: 'step-6',
        type: 'email',
        name: 'Invitation démo',
        templateId: 'template-1',
      },
      {
        id: 'step-7',
        type: 'delay',
        name: 'Attente de 7 jours',
        delay: {
          value: 7,
          unit: 'days'
        }
      },
      {
        id: 'step-8',
        type: 'email',
        name: 'Dernière relance',
        templateId: 'template-3',
      }
    ],
    createdAt: '2023-11-10T09:15:00Z',
    updatedAt: '2023-11-12T11:45:00Z'
  }
];

interface EmailSequenceBuilderProps {
  className?: string;
}

const EmailSequenceBuilder: React.FC<EmailSequenceBuilderProps> = ({ className }) => {
  const [sequences, setSequences] = useState<EmailSequence[]>(defaultSequences);
  const [selectedSequence, setSelectedSequence] = useState<EmailSequence | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isNewSequence, setIsNewSequence] = useState(false);
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [currentStep, setCurrentStep] = useState<SequenceStep | null>(null);
  const [isEditingStep, setIsEditingStep] = useState(false);
  
  const handleSelectSequence = (sequence: EmailSequence) => {
    setSelectedSequence(sequence);
    setIsEditing(false);
    setIsNewSequence(false);
  };
  
  const handleCreateSequence = () => {
    const newSequence: EmailSequence = {
      id: `sequence-${Date.now()}`,
      name: 'Nouvelle séquence',
      description: 'Description de la séquence',
      status: 'draft',
      trigger: 'manual',
      steps: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setSequences([...sequences, newSequence]);
    setSelectedSequence(newSequence);
    setIsEditing(true);
    setIsNewSequence(true);
  };
  
  const handleSaveSequence = () => {
    if (!selectedSequence) return;
    
    const updatedSequence = {
      ...selectedSequence,
      updatedAt: new Date().toISOString()
    };
    
    if (isNewSequence) {
      setSequences(sequences.map(seq => seq.id === updatedSequence.id ? updatedSequence : seq));
      setIsNewSequence(false);
    } else {
      setSequences(sequences.map(seq => seq.id === updatedSequence.id ? updatedSequence : seq));
    }
    
    setIsEditing(false);
    toast.success('Séquence enregistrée avec succès');
  };
  
  const handleDeleteSequence = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette séquence ?')) {
      setSequences(sequences.filter(seq => seq.id !== id));
      if (selectedSequence?.id === id) {
        setSelectedSequence(null);
      }
      toast.success('Séquence supprimée avec succès');
    }
  };
  
  const handleDuplicateSequence = (sequence: EmailSequence) => {
    const duplicatedSequence: EmailSequence = {
      ...sequence,
      id: `sequence-${Date.now()}`,
      name: `${sequence.name} (copie)`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setSequences([...sequences, duplicatedSequence]);
    setSelectedSequence(duplicatedSequence);
    toast.success('Séquence dupliquée avec succès');
  };
  
  const handleChangeSequenceStatus = (id: string, status: 'draft' | 'active' | 'paused' | 'completed') => {
    setSequences(sequences.map(seq => 
      seq.id === id ? {...seq, status, updatedAt: new Date().toISOString()} : seq
    ));
    
    if (selectedSequence?.id === id) {
      setSelectedSequence({...selectedSequence, status, updatedAt: new Date().toISOString()});
    }
    
    toast.success(`Séquence ${status === 'active' ? 'activée' : status === 'paused' ? 'mise en pause' : 'mise à jour'}`);
  };
  
  const handleUpdateSequenceField = (field: string, value: string) => {
    if (!selectedSequence) return;
    
    setSelectedSequence({
      ...selectedSequence,
      [field]: value,
      updatedAt: new Date().toISOString()
    });
  };
  
  // Gestion des étapes de séquence
  const handleAddStep = (type: 'email' | 'delay' | 'condition') => {
    if (!selectedSequence) return;
    
    const newStep: SequenceStep = {
      id: `step-${Date.now()}`,
      type,
      name: type === 'email' ? 'Nouvel email' : 
           type === 'delay' ? 'Nouveau délai' :
           'Nouvelle condition',
    };
    
    if (type === 'delay') {
      newStep.delay = {
        value: 1,
        unit: 'days'
      };
    } else if (type === 'condition') {
      newStep.condition = {
        type: 'email_opened',
        value: 'true'
      };
    }
    
    setCurrentStep(newStep);
    setIsAddingStep(true);
    setIsEditingStep(false);
  };
  
  const handleEditStep = (step: SequenceStep) => {
    setCurrentStep(step);
    setIsEditingStep(true);
    setIsAddingStep(true);
  };
  
  const handleSaveStep = () => {
    if (!selectedSequence || !currentStep) return;
    
    let updatedSteps;
    if (isEditingStep) {
      updatedSteps = selectedSequence.steps.map(step => 
        step.id === currentStep.id ? currentStep : step
      );
    } else {
      updatedSteps = [...selectedSequence.steps, currentStep];
    }
    
    setSelectedSequence({
      ...selectedSequence,
      steps: updatedSteps,
      updatedAt: new Date().toISOString()
    });
    
    setIsAddingStep(false);
    setCurrentStep(null);
    toast.success(`Étape ${isEditingStep ? 'modifiée' : 'ajoutée'} avec succès`);
  };
  
  const handleDeleteStep = (id: string) => {
    if (!selectedSequence) return;
    
    const updatedSteps = selectedSequence.steps.filter(step => step.id !== id);
    
    setSelectedSequence({
      ...selectedSequence,
      steps: updatedSteps,
      updatedAt: new Date().toISOString()
    });
    
    toast.success('Étape supprimée avec succès');
  };
  
  const handleUpdateStepField = (field: string, value: any) => {
    if (!currentStep) return;
    
    if (field.includes('.')) {
      // Handle nested fields like delay.value
      const [parentField, childField] = field.split('.');
      const parentValue = currentStep[parentField as keyof SequenceStep];
      
      if (parentValue && typeof parentValue === 'object') {
        setCurrentStep({
          ...currentStep,
          [parentField]: {
            ...parentValue,
            [childField]: value
          }
        });
      }
    } else {
      setCurrentStep({
        ...currentStep,
        [field]: value
      });
    }
  };
  
  const handleDragEnd = (result: DropResult) => {
    if (!selectedSequence || !result.destination) return;
    
    const items = Array.from(selectedSequence.steps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSelectedSequence({
      ...selectedSequence,
      steps: items,
      updatedAt: new Date().toISOString()
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/15 text-green-600';
      case 'paused':
        return 'bg-amber-500/15 text-amber-600';
      case 'draft':
        return 'bg-blue-500/15 text-blue-600';
      case 'completed':
        return 'bg-slate-500/15 text-slate-600';
      default:
        return 'bg-slate-500/15 text-slate-600';
    }
  };
  
  const getStepIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'delay':
        return <Clock className="h-4 w-4" />;
      case 'condition':
        return <Settings className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };
  
  const getTemplateNameById = (id?: string) => {
    if (!id) return 'Aucun template';
    const template = availableTemplates.find(t => t.id === id);
    return template ? template.name : 'Template inconnu';
  };
  
  const formatDelayText = (delay?: {value: number, unit: string}) => {
    if (!delay) return 'Délai non défini';
    
    const { value, unit } = delay;
    
    switch (unit) {
      case 'minutes':
        return `${value} minute${value > 1 ? 's' : ''}`;
      case 'hours':
        return `${value} heure${value > 1 ? 's' : ''}`;
      case 'days':
        return `${value} jour${value > 1 ? 's' : ''}`;
      default:
        return `${value} ${unit}`;
    }
  };
  
  const formatConditionText = (condition?: {type: string, value: string}) => {
    if (!condition) return 'Condition non définie';
    
    const { type, value } = condition;
    
    switch (type) {
      case 'email_opened':
        return `Email ${value === 'true' ? 'ouvert' : 'non ouvert'}`;
      case 'email_clicked':
        return `Lien ${value === 'true' ? 'cliqué' : 'non cliqué'}`;
      case 'custom':
        return `Condition personnalisée: ${value}`;
      default:
        return `${type}: ${value}`;
    }
  };
  
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-3 gap-6", className)}>
      {/* Liste des séquences */}
      <Card className="col-span-1 glass-card border border-border/50">
        <CardHeader>
          <CardTitle>Séquences d'emails</CardTitle>
          <CardDescription>
            Créez et gérez vos séquences automatisées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-3">
              {sequences.map(sequence => (
                <div 
                  key={sequence.id}
                  className={cn(
                    "p-3 rounded-md border border-border/50 hover:border-primary/50 cursor-pointer transition-all",
                    selectedSequence?.id === sequence.id && "border-primary/50 bg-primary/5"
                  )}
                  onClick={() => handleSelectSequence(sequence)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium">{sequence.name}</h3>
                    <div className={cn("text-xs px-2 py-1 rounded-full", getStatusColor(sequence.status))}>
                      {sequence.status === 'active' ? 'Active' : 
                       sequence.status === 'paused' ? 'En pause' : 
                       sequence.status === 'draft' ? 'Brouillon' : 'Terminée'}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{sequence.description}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {sequence.steps.filter(step => step.type === 'email').length} emails
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {Math.max(...sequence.steps
                        .filter(step => step.type === 'delay')
                        .map(step => step.delay?.value || 0))} jours
                    </span>
                  </div>
                </div>
              ))}
              
              <div 
                className="p-3 rounded-md border border-dashed border-border/50 hover:border-primary/50 cursor-pointer transition-all flex items-center justify-center"
                onClick={handleCreateSequence}
              >
                <Plus className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Créer une nouvelle séquence</span>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      {/* Détail et édition de la séquence */}
      <div className="col-span-1 lg:col-span-2">
        {selectedSequence ? (
          <Card className="glass-card border border-border/50 h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                {isEditing ? (
                  <div className="space-y-2">
                    <Input 
                      value={selectedSequence.name}
                      onChange={(e) => handleUpdateSequenceField('name', e.target.value)}
                      className="font-semibold text-xl"
                    />
                    <Textarea
                      value={selectedSequence.description || ''}
                      onChange={(e) => handleUpdateSequenceField('description', e.target.value)}
                      placeholder="Description de la séquence"
                      className="h-20"
                    />
                  </div>
                ) : (
                  <>
                    <CardTitle className="text-xl">{selectedSequence.name}</CardTitle>
                    <CardDescription>{selectedSequence.description}</CardDescription>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <Button variant="outline" size="sm" onClick={handleSaveSequence}>
                    <Save className="h-4 w-4 mr-1" />
                    <span>Enregistrer</span>
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-1" />
                      <span>Modifier</span>
                    </Button>
                    
                    {selectedSequence.status === 'draft' || selectedSequence.status === 'paused' ? (
                      <Button variant="outline" size="sm" onClick={() => handleChangeSequenceStatus(selectedSequence.id, 'active')}>
                        <Play className="h-4 w-4 mr-1" />
                        <span>Activer</span>
                      </Button>
                    ) : selectedSequence.status === 'active' ? (
                      <Button variant="outline" size="sm" onClick={() => handleChangeSequenceStatus(selectedSequence.id, 'paused')}>
                        <Pause className="h-4 w-4 mr-1" />
                        <span>Mettre en pause</span>
                      </Button>
                    ) : null}
                  </>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="flex-grow overflow-hidden">
              <Tabs defaultValue="builder">
                <TabsList className="mb-4">
                  <TabsTrigger value="builder">Constructeur</TabsTrigger>
                  <TabsTrigger value="settings">Paramètres</TabsTrigger>
                  <TabsTrigger value="preview">Aperçu</TabsTrigger>
                </TabsList>
                
                <TabsContent value="builder" className="h-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium">Étapes de la séquence</h3>
                    
                    {isEditing && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleAddStep('email')}>
                          <Mail className="h-4 w-4 mr-1" />
                          Email
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleAddStep('delay')}>
                          <Clock className="h-4 w-4 mr-1" />
                          Délai
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleAddStep('condition')}>
                          <Settings className="h-4 w-4 mr-1" />
                          Condition
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <ScrollArea className="h-[400px] pr-4">
                    {selectedSequence.steps.length > 0 ? (
                      <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="sequence-steps">
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="space-y-3"
                            >
                              {selectedSequence.steps.map((step, index) => (
                                <Draggable 
                                  key={step.id} 
                                  draggableId={step.id} 
                                  index={index}
                                  isDragDisabled={!isEditing}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="border border-border/50 rounded-md bg-background"
                                    >
                                      <div className="p-3">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center">
                                            <div className={cn(
                                              "w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs text-white",
                                              step.type === 'email' ? "bg-primary" : 
                                              step.type === 'delay' ? "bg-orange-500" :
                                              "bg-purple-500"
                                            )}>
                                              {index + 1}
                                            </div>
                                            <div>
                                              <h4 className="text-sm font-medium flex items-center">
                                                {getStepIcon(step.type)}
                                                <span className="ml-2">{step.name}</span>
                                              </h4>
                                              <p className="text-xs text-muted-foreground">
                                                {step.type === 'email' ? getTemplateNameById(step.templateId) : 
                                                 step.type === 'delay' ? formatDelayText(step.delay) :
                                                 formatConditionText(step.condition)}
                                              </p>
                                            </div>
                                          </div>
                                          
                                          {isEditing && (
                                            <div className="flex gap-1">
                                              <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleEditStep(step)}>
                                                <Edit className="h-3.5 w-3.5" />
                                              </Button>
                                              <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => handleDeleteStep(step.id)}>
                                                <Trash className="h-3.5 w-3.5" />
                                              </Button>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      
                                      {index < selectedSequence.steps.length - 1 && (
                                        <div className="h-6 flex items-center justify-center">
                                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-border/50 rounded-md">
                        <div className="mb-4 p-3 rounded-full bg-primary/10">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Aucune étape</h3>
                        <p className="text-muted-foreground mb-4">
                          Commencez à construire votre séquence en ajoutant des étapes.
                        </p>
                        {isEditing && (
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleAddStep('email')}>
                              <Mail className="h-4 w-4 mr-1" />
                              Ajouter un email
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="settings">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sequence-trigger">Déclenchement</Label>
                        <Select 
                          disabled={!isEditing}
                          value={selectedSequence.trigger}
                          onValueChange={(value) => handleUpdateSequenceField('trigger', value)}
                        >
                          <SelectTrigger id="sequence-trigger">
                            <SelectValue placeholder="Type de déclenchement" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manual">Manuel</SelectItem>
                            <SelectItem value="automatic">Automatique</SelectItem>
                          </SelectContent>
                        </Select>
                        {selectedSequence.trigger === 'automatic' && (
                          <div className="mt-4 space-y-2">
                            <Label htmlFor="trigger-condition">Condition de déclenchement</Label>
                            <Textarea
                              id="trigger-condition"
                              placeholder="Ex: Quand un contact est ajouté à une liste"
                              value={selectedSequence.triggerCondition || ''}
                              onChange={(e) => handleUpdateSequenceField('triggerCondition', e.target.value)}
                              disabled={!isEditing}
                              className="h-20"
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label className="mb-2 block">Statistiques</Label>
                          <div className="bg-muted/30 p-3 rounded-md">
                            <p className="text-sm mb-1.5">Cette séquence contient:</p>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-1 text-primary" />
                                <span>{selectedSequence.steps.filter(step => step.type === 'email').length} emails</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-orange-500" />
                                <span>{selectedSequence.steps.filter(step => step.type === 'delay').length} délais</span>
                              </div>
                              <div className="flex items-center">
                                <Settings className="h-4 w-4 mr-1 text-purple-500" />
                                <span>{selectedSequence.steps.filter(step => step.type === 'condition').length} conditions</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">Mise à jour automatique des contacts</span>
                            <span className="text-xs text-muted-foreground">Mettre à jour les informations des contacts lors de l'exécution</span>
                          </div>
                          <Switch disabled={!isEditing} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">Notifications d'erreurs</span>
                            <span className="text-xs text-muted-foreground">Recevoir des notifications en cas d'erreur</span>
                          </div>
                          <Switch checked={true} disabled={!isEditing} />
                        </div>
                      </div>
                    </div>
                    
                    <Accordion type="single" collapsible className="border rounded-md">
                      <AccordionItem value="advanced">
                        <AccordionTrigger className="px-4">
                          <span className="flex items-center">
                            <Settings className="h-4 w-4 mr-2" />
                            Paramètres avancés
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">Arrêter si le contact répond</span>
                                <span className="text-xs text-muted-foreground">Arrêter automatiquement la séquence si le contact répond</span>
                              </div>
                              <Switch checked={true} disabled={!isEditing} />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">Respecter les heures d'envoi</span>
                                <span className="text-xs text-muted-foreground">Envoyer les emails uniquement pendant les heures de bureau</span>
                              </div>
                              <Switch disabled={!isEditing} />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">Désabonnement automatique</span>
                                <span className="text-xs text-muted-foreground">Retirer le contact de la séquence s'il se désabonne</span>
                              </div>
                              <Switch checked={true} disabled={!isEditing} />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </TabsContent>
                
                <TabsContent value="preview">
                  <div className="border border-border/50 rounded-md p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-medium mb-2">Aperçu de la séquence</h3>
                      <p className="text-muted-foreground text-sm">Voici comment votre séquence apparaîtra aux contacts</p>
                    </div>
                    
                    <div className="space-y-6">
                      {selectedSequence.steps.map((step, index) => (
                        <div key={step.id} className="border border-border/50 rounded-md p-4">
                          <div className="flex items-center mb-3">
                            <div className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs text-white",
                              step.type === 'email' ? "bg-primary" : 
                              step.type === 'delay' ? "bg-orange-500" :
                              "bg-purple-500"
                            )}>
                              {index + 1}
                            </div>
                            <h4 className="text-sm font-medium flex items-center">
                              {getStepIcon(step.type)}
                              <span className="ml-2">{step.name}</span>
                            </h4>
                          </div>
                          
                          {step.type === 'email' && (
                            <div className="bg-muted/20 p-4 rounded-md">
                              <p className="text-sm mb-2 font-medium">{getTemplateNameById(step.templateId)}</p>
                              <p className="text-xs text-muted-foreground">
                                Contenu de l'email personnalisé pour le destinataire...
                              </p>
                            </div>
                          )}
                          
                          {step.type === 'delay' && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-orange-500" />
                              <span className="text-sm">{formatDelayText(step.delay)} d'attente</span>
                            </div>
                          )}
                          
                          {step.type === 'condition' && (
                            <div className="flex items-center">
                              <Settings className="h-4 w-4 mr-2 text-purple-500" />
                              <span className="text-sm">{formatConditionText(step.condition)}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <div className="h-full flex items-center justify-center border border-dashed border-border/50 rounded-md p-8">
            <div className="text-center">
              <div className="mb-4 p-3 rounded-full bg-primary/10 inline-block">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Aucune séquence sélectionnée</h3>
              <p className="text-muted-foreground mb-4">
                Sélectionnez une séquence existante ou créez-en une nouvelle.
              </p>
              <Button onClick={handleCreateSequence}>
                <Plus className="h-4 w-4 mr-1" />
                Créer une séquence
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Dialogue pour l'ajout/édition d'étape */}
      <Dialog open={isAddingStep} onOpenChange={(open) => !open && setIsAddingStep(false)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{isEditingStep ? 'Modifier une étape' : 'Ajouter une étape'}</DialogTitle>
            <DialogDescription>
              {currentStep?.type === 'email' ? 'Configurer un email de la séquence' :
               currentStep?.type === 'delay' ? 'Configurer un délai entre deux étapes' :
               'Configurer une condition pour diriger le flux de la séquence'}
            </DialogDescription>
          </DialogHeader>
          
          {currentStep && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="step-name">Nom de l'étape</Label>
                <Input 
                  id="step-name"
                  value={currentStep.name}
                  onChange={(e) => handleUpdateStepField('name', e.target.value)}
                />
              </div>
              
              {currentStep.type === 'email' && (
                <div>
                  <Label htmlFor="email-template">Modèle d'email</Label>
                  <Select 
                    value={currentStep.templateId || ''}
                    onValueChange={(value) => handleUpdateStepField('templateId', value)}
                  >
                    <SelectTrigger id="email-template">
                      <SelectValue placeholder="Sélectionner un modèle" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTemplates.map(template => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {currentStep.type === 'delay' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="delay-value">Durée</Label>
                    <Input 
                      id="delay-value"
                      type="number"
                      min={1}
                      value={currentStep.delay?.value || 1}
                      onChange={(e) => handleUpdateStepField('delay.value', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="delay-unit">Unité</Label>
                    <Select 
                      value={currentStep.delay?.unit || 'days'}
                      onValueChange={(value) => handleUpdateStepField('delay.unit', value)}
                    >
                      <SelectTrigger id="delay-unit">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutes">Minutes</SelectItem>
                        <SelectItem value="hours">Heures</SelectItem>
                        <SelectItem value="days">Jours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              
              {currentStep.type === 'condition' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="condition-type">Type de condition</Label>
                    <Select 
                      value={currentStep.condition?.type || 'email_opened'}
                      onValueChange={(value) => handleUpdateStepField('condition.type', value)}
                    >
                      <SelectTrigger id="condition-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email_opened">Email ouvert</SelectItem>
                        <SelectItem value="email_clicked">Lien cliqué</SelectItem>
                        <SelectItem value="custom">Condition personnalisée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {currentStep.condition?.type === 'custom' ? (
                    <div>
                      <Label htmlFor="condition-custom">Condition personnalisée</Label>
                      <Textarea 
                        id="condition-custom"
                        value={currentStep.condition?.value || ''}
                        onChange={(e) => handleUpdateStepField('condition.value', e.target.value)}
                        placeholder="Entrez votre condition personnalisée"
                      />
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="condition-value">Valeur</Label>
                      <Select 
                        value={currentStep.condition?.value || 'true'}
                        onValueChange={(value) => handleUpdateStepField('condition.value', value)}
                      >
                        <SelectTrigger id="condition-value">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Oui</SelectItem>
                          <SelectItem value="false">Non</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingStep(false)}>Annuler</Button>
            <Button onClick={handleSaveStep}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailSequenceBuilder;
