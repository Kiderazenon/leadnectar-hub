
import React, { useState } from 'react';
import DashboardStats from '@/components/dashboard/DashboardStats';
import ActivityChart from '@/components/dashboard/ActivityChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Mail, Phone, Linkedin, CheckCheck, Clock, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const mockTasks = [
  {
    id: '1',
    title: 'Appeler Sophie Girard',
    description: 'Suivi de la proposition commerciale',
    dueDate: '2023-11-18',
    priority: 'high',
    type: 'call'
  },
  {
    id: '2',
    title: 'Envoyer une proposition à Thomas',
    description: 'Document de présentation personnalisé',
    dueDate: '2023-11-19',
    priority: 'medium',
    type: 'email'
  },
  {
    id: '3',
    title: 'Relancer Paul Dupont',
    description: 'Pas de réponse depuis 1 semaine',
    dueDate: '2023-11-17',
    priority: 'medium',
    type: 'email'
  },
  {
    id: '4',
    title: 'Rendez-vous avec Marie Laurent',
    description: 'Présentation produit',
    dueDate: '2023-11-20',
    priority: 'high',
    type: 'meeting'
  },
  {
    id: '5',
    title: 'Envoyer une invitation LinkedIn à Jean Martin',
    description: 'Directeur technique chez ABC Corp',
    dueDate: '2023-11-18',
    priority: 'low',
    type: 'linkedin'
  }
];

const mockRecentContacts = [
  {
    id: '1',
    name: 'Emma Dupont',
    company: 'Tech Solutions',
    position: 'Marketing Director',
    lastActivity: {
      type: 'email',
      date: '2023-11-15',
      description: 'A répondu à votre email'
    }
  },
  {
    id: '2',
    name: 'Laurent Martin',
    company: 'Global Innovations',
    position: 'CEO',
    lastActivity: {
      type: 'meeting',
      date: '2023-11-14',
      description: 'Appel de 30 minutes'
    }
  },
  {
    id: '3',
    name: 'Sophie Bernard',
    company: 'Creative Design',
    position: 'Art Director',
    lastActivity: {
      type: 'linkedin',
      date: '2023-11-13',
      description: 'A accepté votre invitation'
    }
  }
];

const priorityColors = {
  low: 'bg-blue-500/10 text-blue-600',
  medium: 'bg-amber-500/10 text-amber-600',
  high: 'bg-red-500/10 text-red-600'
};

const typeIcons = {
  call: <Phone className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
  meeting: <Calendar className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />
};

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState(mockTasks);
  
  const completeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  return (
    <div className="p-6 max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Bonjour, John</h1>
        <p className="text-muted-foreground">Voici un aperçu de votre activité de prospection</p>
      </div>
      
      <div className="space-y-6">
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityChart />
          </div>
          
          <div className="lg:col-span-1">
            <Card className="glass-card h-full border border-border/50 animate-scale-in">
              <CardHeader className="pb-3">
                <CardTitle>Tâches à faire</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[344px] px-6">
                  {tasks.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground">Aucune tâche en attente</p>
                      <Button variant="outline" className="mt-4">
                        Créer une tâche
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3 pb-6">
                      {tasks.map((task) => (
                        <div 
                          key={task.id} 
                          className="flex items-start p-3 border border-border/40 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="mr-3 mt-0.5">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 rounded-full hover:bg-primary/10 hover:text-primary"
                              onClick={() => completeTask(task.id)}
                            >
                              <CheckCheck className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium truncate">{task.title}</span>
                              <Badge variant="outline" className={cn(
                                "rounded-full text-xs font-normal ml-auto",
                                priorityColors[task.priority]
                              )}>
                                {task.priority === 'low' ? 'Basse' : task.priority === 'medium' ? 'Moyenne' : 'Haute'}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground line-clamp-1 mb-1.5">{task.description}</p>
                            
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(task.dueDate).toLocaleDateString('fr-FR', {
                                  day: 'numeric',
                                  month: 'short'
                                })}
                              </span>
                              <span className="mx-2">•</span>
                              <span className="flex items-center gap-1">
                                {typeIcons[task.type]}
                                {task.type === 'call' ? 'Appel' : 
                                 task.type === 'email' ? 'Email' : 
                                 task.type === 'meeting' ? 'Rendez-vous' : 'LinkedIn'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
                
                <div className="p-3 border-t border-border flex justify-center">
                  <Button variant="outline" className="w-full">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    <span>Voir toutes les tâches</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="glass-card h-full border border-border/50 animate-scale-in">
              <CardHeader className="pb-3">
                <CardTitle>Activités récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4 -mr-4">
                  <div className="space-y-4 relative border-l border-border/60 pl-6 ml-3">
                    {mockRecentContacts.map((contact, index) => (
                      <div key={contact.id} className="relative">
                        <div 
                          className="absolute -left-10 p-1.5 rounded-full bg-background border border-border"
                        >
                          {contact.lastActivity.type === 'email' ? (
                            <Mail className="h-4 w-4 text-primary" />
                          ) : contact.lastActivity.type === 'meeting' ? (
                            <Calendar className="h-4 w-4 text-green-500" />
                          ) : (
                            <Linkedin className="h-4 w-4 text-[#0077b5]" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="" alt={contact.name} />
                            <AvatarFallback>
                              {contact.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <h4 className="font-medium">{contact.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {contact.position}, {contact.company}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-2 text-sm">
                          <p>{contact.lastActivity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(contact.lastActivity.date).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="glass-card h-full border border-border/50 animate-scale-in">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Aperçu du pipeline</CardTitle>
                  <Button variant="outline" size="sm">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    <span>Voir tout</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="grid w-[400px] grid-cols-4 mb-4">
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="qualified">Qualifiés</TabsTrigger>
                    <TabsTrigger value="proposal">Proposition</TabsTrigger>
                    <TabsTrigger value="negotiation">Négociation</TabsTrigger>
                  </TabsList>
                  
                  <div className="bg-muted/30 rounded-lg">
                    <div className="grid grid-cols-5 gap-px bg-border/30">
                      <div className="p-3 font-medium text-sm bg-background">Lead</div>
                      <div className="p-3 font-medium text-sm bg-background">Entreprise</div>
                      <div className="p-3 font-medium text-sm bg-background">Valeur</div>
                      <div className="p-3 font-medium text-sm bg-background">Stage</div>
                      <div className="p-3 font-medium text-sm bg-background">Dernière activité</div>
                    </div>
                    
                    <div className="divide-y divide-border/30">
                      <div className="grid grid-cols-5 gap-px hover:bg-muted/40 transition-colors">
                        <div className="p-3 bg-background">Sophie Girard</div>
                        <div className="p-3 bg-background">Axis Solutions</div>
                        <div className="p-3 bg-background font-medium">€ 8,500</div>
                        <div className="p-3 bg-background">
                          <Badge className="bg-blue-500/10 text-blue-600 rounded-full font-normal">
                            Prospection
                          </Badge>
                        </div>
                        <div className="p-3 bg-background text-sm">14 nov. 2023</div>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-px hover:bg-muted/40 transition-colors">
                        <div className="p-3 bg-background">Luc Bernard</div>
                        <div className="p-3 bg-background">Global Innovations</div>
                        <div className="p-3 bg-background font-medium">€ 25,000</div>
                        <div className="p-3 bg-background">
                          <Badge className="bg-purple-500/10 text-purple-600 rounded-full font-normal">
                            Qualification
                          </Badge>
                        </div>
                        <div className="p-3 bg-background text-sm">10 nov. 2023</div>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-px hover:bg-muted/40 transition-colors">
                        <div className="p-3 bg-background">Claire Moreau</div>
                        <div className="p-3 bg-background">Design Studio</div>
                        <div className="p-3 bg-background font-medium">€ 12,000</div>
                        <div className="p-3 bg-background">
                          <Badge className="bg-amber-500/10 text-amber-600 rounded-full font-normal">
                            Proposition
                          </Badge>
                        </div>
                        <div className="p-3 bg-background text-sm">8 nov. 2023</div>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-px hover:bg-muted/40 transition-colors">
                        <div className="p-3 bg-background">Thomas Legrand</div>
                        <div className="p-3 bg-background">Tech Innovators</div>
                        <div className="p-3 bg-background font-medium">€ 35,000</div>
                        <div className="p-3 bg-background">
                          <Badge className="bg-orange-500/10 text-orange-600 rounded-full font-normal">
                            Négociation
                          </Badge>
                        </div>
                        <div className="p-3 bg-background text-sm">5 nov. 2023</div>
                      </div>
                    </div>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
