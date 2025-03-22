
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Linkedin, 
  MoreHorizontal, 
  CalendarClock, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  PlayCircle, 
  PauseCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'failed';
  type: 'email' | 'linkedin';
  contacts: number;
  progress: number;
  metrics: {
    sent: number;
    opened: number;
    clicked: number;
    replied: number;
  };
  schedule: {
    start: string;
    end?: string;
  };
  lastActivity: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Cold Email - Software Companies',
    status: 'active',
    type: 'email',
    contacts: 120,
    progress: 65,
    metrics: {
      sent: 78,
      opened: 52,
      clicked: 21,
      replied: 14
    },
    schedule: {
      start: '2023-11-01',
      end: '2023-12-01'
    },
    lastActivity: '2023-11-15'
  },
  {
    id: '2',
    name: 'LinkedIn - Decision Makers',
    status: 'active',
    type: 'linkedin',
    contacts: 85,
    progress: 40,
    metrics: {
      sent: 34,
      opened: 28,
      clicked: 15,
      replied: 8
    },
    schedule: {
      start: '2023-11-05',
      end: '2023-12-05'
    },
    lastActivity: '2023-11-15'
  },
  {
    id: '3',
    name: 'Follow-up - Trade Show Contacts',
    status: 'completed',
    type: 'email',
    contacts: 45,
    progress: 100,
    metrics: {
      sent: 45,
      opened: 38,
      clicked: 22,
      replied: 17
    },
    schedule: {
      start: '2023-10-15',
      end: '2023-11-01'
    },
    lastActivity: '2023-11-01'
  },
  {
    id: '4',
    name: 'Cold Outreach - Marketing Directors',
    status: 'paused',
    type: 'email',
    contacts: 95,
    progress: 20,
    metrics: {
      sent: 19,
      opened: 12,
      clicked: 5,
      replied: 3
    },
    schedule: {
      start: '2023-11-10'
    },
    lastActivity: '2023-11-12'
  },
  {
    id: '5',
    name: 'LinkedIn Intro - New Connections',
    status: 'draft',
    type: 'linkedin',
    contacts: 60,
    progress: 0,
    metrics: {
      sent: 0,
      opened: 0,
      clicked: 0,
      replied: 0
    },
    schedule: {
      start: '2023-11-20'
    },
    lastActivity: '2023-11-14'
  }
];

const statusColors = {
  draft: 'bg-muted text-muted-foreground',
  active: 'bg-green-500/10 text-green-600',
  paused: 'bg-amber-500/10 text-amber-600',
  completed: 'bg-blue-500/10 text-blue-600',
  failed: 'bg-red-500/10 text-red-600'
};

const statusIcons = {
  draft: <Clock className="h-4 w-4 mr-1.5" />,
  active: <PlayCircle className="h-4 w-4 mr-1.5" />,
  paused: <PauseCircle className="h-4 w-4 mr-1.5" />,
  completed: <CheckCircle2 className="h-4 w-4 mr-1.5" />,
  failed: <AlertCircle className="h-4 w-4 mr-1.5" />
};

const CampaignsList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                          (filter === 'email' && campaign.type === 'email') || 
                          (filter === 'linkedin' && campaign.type === 'linkedin');
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div className="space-y-4 animate-scale-in">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Rechercher des campagnes..." 
            className="pl-9 h-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="w-[250px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            <span>Nouvelle campagne</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="glass-card overflow-hidden border border-border/50">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className={cn(
                    "rounded-full font-normal flex items-center",
                    statusColors[campaign.status]
                  )}>
                    {statusIcons[campaign.status]}
                    <span>
                      {campaign.status === 'draft' ? 'Brouillon' : 
                       campaign.status === 'active' ? 'Active' : 
                       campaign.status === 'paused' ? 'En pause' : 
                       campaign.status === 'completed' ? 'Terminée' : 'Échouée'}
                    </span>
                  </Badge>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass w-40">
                      <DropdownMenuItem className="cursor-pointer">
                        Voir
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        {campaign.status === 'active' ? 'Mettre en pause' : 
                         campaign.status === 'paused' ? 'Reprendre' : ''}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-destructive">
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="mt-3">
                  <h3 className="font-medium text-lg">{campaign.name}</h3>
                  
                  <div className="flex items-center gap-1 mt-1">
                    {campaign.type === 'email' ? (
                      <Mail className="h-4 w-4 text-primary" />
                    ) : (
                      <Linkedin className="h-4 w-4 text-[#0077b5]" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {campaign.type === 'email' ? 'Campagne email' : 'Campagne LinkedIn'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{campaign.contacts} contacts</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm">
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(campaign.schedule.start).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short'
                      })}
                      {campaign.schedule.end && (
                        <>
                          {' - '}
                          {new Date(campaign.schedule.end).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </>
                      )}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center text-sm mb-1.5">
                    <span className="text-muted-foreground">Progression</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <div className="text-center p-2 bg-muted/30 rounded">
                    <p className="text-xs text-muted-foreground">Envoyés</p>
                    <p className="font-medium">{campaign.metrics.sent}</p>
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded">
                    <p className="text-xs text-muted-foreground">Ouverts</p>
                    <p className="font-medium">{campaign.metrics.opened}</p>
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded">
                    <p className="text-xs text-muted-foreground">Cliqués</p>
                    <p className="font-medium">{campaign.metrics.clicked}</p>
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded">
                    <p className="text-xs text-muted-foreground">Réponses</p>
                    <p className="font-medium">{campaign.metrics.replied}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 p-3 flex justify-between items-center text-sm border-t border-border/40">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Dernière activité</span>
                </div>
                <span>
                  {new Date(campaign.lastActivity).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-2">Aucune campagne trouvée</div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            <span>Créer une campagne</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CampaignsList;
