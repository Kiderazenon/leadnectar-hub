
import React, { useState } from 'react';
import PipelineComponent from '@/components/pipeline/Pipeline';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const Pipeline: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="p-6 max-w-7xl mx-auto animate-fade-in">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Pipeline de vente</h1>
        
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>Filtres</span>
          </Button>
          
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span>Nouvelle opportunité</span>
          </Button>
        </div>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Rechercher des opportunités..." 
            className="pl-9 h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="lead">Leads</SelectItem>
              <SelectItem value="qualification">Qualification</SelectItem>
              <SelectItem value="proposition">Proposition</SelectItem>
              <SelectItem value="negotiation">Négociation</SelectItem>
              <SelectItem value="closed">Fermé gagné</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Assigné à" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tout le monde</SelectItem>
              <SelectItem value="me">Moi</SelectItem>
              <SelectItem value="unassigned">Non assigné</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <PipelineComponent />
    </div>
  );
};

export default Pipeline;
