
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Building, CalendarClock, MoreHorizontal, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface LeadCardProps {
  lead: {
    id: string;
    name: string;
    company: string;
    position: string;
    value: number;
    stage: string;
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
  };
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
}

const priorityColors = {
  low: 'bg-blue-500/10 text-blue-600',
  medium: 'bg-amber-500/10 text-amber-600',
  high: 'bg-red-500/10 text-red-600'
};

const LeadCard: React.FC<LeadCardProps> = ({ lead, onDragStart, onDragEnd }) => {
  return (
    <Card 
      className="glass-card p-3 cursor-move border border-border/50 transition-all duration-200 hover:shadow-glass animate-scale-in"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="flex justify-between items-start">
        <Badge variant="outline" className={cn(
          "rounded-full text-xs font-normal",
          priorityColors[lead.priority]
        )}>
          {lead.priority === 'low' ? 'Basse' : lead.priority === 'medium' ? 'Moyenne' : 'Haute'}
        </Badge>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full -mt-1 -mr-1">
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
            <DropdownMenuItem className="cursor-pointer text-destructive">
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="mt-2">
        <h3 className="font-medium line-clamp-1">{lead.name}</h3>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
          <Building className="h-3 w-3" />
          <span className="line-clamp-1">{lead.company}</span>
        </div>
        
        <div className="mt-2 text-sm font-medium">
          € {lead.value.toLocaleString()}
        </div>
      </div>
      
      {lead.nextAction && (
        <div className="mt-3 flex items-center gap-1 text-xs p-1.5 bg-muted/50 rounded">
          <CalendarClock className="h-3 w-3 text-muted-foreground" />
          <span className="text-muted-foreground">{lead.nextAction.type}:</span>
          <span className="font-medium">
            {new Date(lead.nextAction.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short'
            })}
          </span>
        </div>
      )}
      
      <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Avatar className="h-5 w-5">
            <AvatarImage src="" alt={lead.assignedTo.name} />
            <AvatarFallback className="text-xs">
              {lead.assignedTo.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{lead.assignedTo.name}</span>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>
            {new Date(lead.lastActivity).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short'
            })}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default LeadCard;
