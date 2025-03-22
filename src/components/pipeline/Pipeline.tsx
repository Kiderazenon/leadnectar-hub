
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Filter, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LeadCard from './LeadCard';
import { cn } from '@/lib/utils';

interface Lead {
  id: string;
  name: string;
  company: string;
  position: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: {
    name: string;
    avatar?: string;
  };
  lastActivity: string;
  nextAction?: {
    type: string;
    date: string;
  };
}

interface StageConfig {
  id: string;
  title: string;
  color: string;
}

const stageConfigs: Record<string, StageConfig> = {
  prospecting: {
    id: 'prospecting',
    title: 'Prospection',
    color: 'bg-blue-500'
  },
  qualification: {
    id: 'qualification',
    title: 'Qualification',
    color: 'bg-purple-500'
  },
  proposal: {
    id: 'proposal',
    title: 'Proposition',
    color: 'bg-amber-500'
  },
  negotiation: {
    id: 'negotiation',
    title: 'Négociation',
    color: 'bg-orange-500'
  },
  closed: {
    id: 'closed',
    title: 'Gagnés',
    color: 'bg-green-500'
  }
};

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Martin Dubois',
    company: 'Acme Inc.',
    position: 'CTO',
    value: 15000,
    stage: 'prospecting',
    priority: 'medium',
    assignedTo: {
      name: 'John Doe',
    },
    lastActivity: '2023-11-15'
  },
  {
    id: '2',
    name: 'Sophie Girard',
    company: 'Axis Solutions',
    position: 'Marketing Director',
    value: 8500,
    stage: 'prospecting',
    priority: 'high',
    assignedTo: {
      name: 'John Doe',
    },
    lastActivity: '2023-11-14',
    nextAction: {
      type: 'Call',
      date: '2023-11-20'
    }
  },
  {
    id: '3',
    name: 'Luc Bernard',
    company: 'Global Innovations',
    position: 'CEO',
    value: 25000,
    stage: 'qualification',
    priority: 'high',
    assignedTo: {
      name: 'Jane Smith',
    },
    lastActivity: '2023-11-10',
    nextAction: {
      type: 'Meeting',
      date: '2023-11-18'
    }
  },
  {
    id: '4',
    name: 'Claire Moreau',
    company: 'Design Studio',
    position: 'Product Owner',
    value: 12000,
    stage: 'proposal',
    priority: 'medium',
    assignedTo: {
      name: 'John Doe',
    },
    lastActivity: '2023-11-08'
  },
  {
    id: '5',
    name: 'Thomas Legrand',
    company: 'Tech Innovators',
    position: 'CIO',
    value: 35000,
    stage: 'negotiation',
    priority: 'high',
    assignedTo: {
      name: 'Jane Smith',
    },
    lastActivity: '2023-11-05',
    nextAction: {
      type: 'Follow-up',
      date: '2023-11-16'
    }
  },
  {
    id: '6',
    name: 'Laura Petit',
    company: 'Marketing Pro',
    position: 'CEO',
    value: 18000,
    stage: 'closed',
    priority: 'medium',
    assignedTo: {
      name: 'John Doe',
    },
    lastActivity: '2023-11-01'
  }
];

const Pipeline: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [showFilters, setShowFilters] = useState(false);
  
  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData('leadId', leadId);
    const dragImage = new Image();
    dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    
    // Add dragging class to the element being dragged
    const element = e.currentTarget as HTMLElement;
    element.classList.add('opacity-50', 'scale-95');
  };
  
  const handleDragEnd = (e: React.DragEvent) => {
    const element = e.currentTarget as HTMLElement;
    element.classList.remove('opacity-50', 'scale-95');
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLElement;
    element.classList.add('bg-muted/50');
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    const element = e.currentTarget as HTMLElement;
    element.classList.remove('bg-muted/50');
  };
  
  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLElement;
    element.classList.remove('bg-muted/50');
    
    const leadId = e.dataTransfer.getData('leadId');
    if (!leadId) return;
    
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? { ...lead, stage: stageId as Lead['stage'] } 
          : lead
      )
    );
  };
  
  // Group leads by stage
  const leadsByStage = leads.reduce<Record<string, Lead[]>>((acc, lead) => {
    if (!acc[lead.stage]) {
      acc[lead.stage] = [];
    }
    acc[lead.stage].push(lead);
    return acc;
  }, {});
  
  // Calculate stage totals
  const stageTotals = Object.entries(leadsByStage).reduce<Record<string, number>>((acc, [stage, stageLeads]) => {
    acc[stage] = stageLeads.reduce((sum, lead) => sum + lead.value, 0);
    return acc;
  }, {});
  
  const totalValue = Object.values(leads).reduce((sum, lead) => sum + lead.value, 0);
  
  return (
    <div className="space-y-4 animate-scale-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Pipeline de vente</h1>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filtres</span>
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform",
              showFilters ? "transform rotate-180" : ""
            )} />
          </Button>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            <span>Nouveau lead</span>
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <div className="glass-card p-4 grid grid-cols-1 md:grid-cols-3 gap-4 animate-scale-in">
          <div>
            <label className="text-sm font-medium">Priorité</label>
            <div className="flex items-center gap-2 mt-2">
              <Button variant="outline" size="sm" className="rounded-full">Tous</Button>
              <Button variant="outline" size="sm" className="rounded-full">Haute</Button>
              <Button variant="outline" size="sm" className="rounded-full">Moyenne</Button>
              <Button variant="outline" size="sm" className="rounded-full">Basse</Button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Assigné à</label>
            <div className="flex items-center gap-2 mt-2">
              <Button variant="outline" size="sm" className="rounded-full">Tous</Button>
              <Button variant="outline" size="sm" className="rounded-full">John Doe</Button>
              <Button variant="outline" size="sm" className="rounded-full">Jane Smith</Button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Actions</label>
            <div className="flex items-center gap-2 mt-2">
              <Button size="sm" className="rounded-full">Appliquer</Button>
              <Button variant="outline" size="sm" className="rounded-full">Réinitialiser</Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-muted/30 rounded-lg p-4 flex items-center justify-between">
        <div>
          <span className="text-sm text-muted-foreground">Total du pipeline</span>
          <h3 className="text-2xl font-semibold">€ {totalValue.toLocaleString()}</h3>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-center">
            <span className="text-sm text-muted-foreground">Leads</span>
            <p className="font-semibold">{leads.length}</p>
          </div>
          
          <div className="text-center">
            <span className="text-sm text-muted-foreground">Taux de conversion</span>
            <p className="font-semibold">
              {leads.length > 0 
                ? `${Math.round((leads.filter(l => l.stage === 'closed').length / leads.length) * 100)}%` 
                : '0%'}
            </p>
          </div>
          
          <div className="text-center">
            <span className="text-sm text-muted-foreground">Valeur moyenne</span>
            <p className="font-semibold">
              € {leads.length > 0 
                ? Math.round(totalValue / leads.length).toLocaleString() 
                : '0'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pb-8">
        {Object.entries(stageConfigs).map(([stageId, config]) => (
          <div 
            key={stageId}
            className="flex flex-col"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, stageId)}
          >
            <div className="glass-card mb-4 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <div className={`h-3 w-3 rounded-full mr-2 ${config.color}`} />
                <h3 className="font-semibold">{config.title}</h3>
                <span className="ml-auto text-sm text-muted-foreground">
                  {leadsByStage[stageId]?.length || 0}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-medium">
                  € {(stageTotals[stageId] || 0).toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="space-y-3 min-h-[200px]">
              {leadsByStage[stageId]?.map((lead) => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  onDragStart={(e) => handleDragStart(e, lead.id)}
                  onDragEnd={handleDragEnd}
                />
              ))}
              
              <Button 
                variant="outline" 
                className="w-full border-dashed"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span>Ajouter un lead</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pipeline;
