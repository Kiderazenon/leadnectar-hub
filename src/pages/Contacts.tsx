
import React, { useState } from 'react';
import ContactsList from '@/components/contacts/ContactsList';
import ContactCard from '@/components/contacts/ContactCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid3X3, List } from 'lucide-react';

const mockContact = {
  id: '1',
  name: 'Emma Dupont',
  email: 'emma.dupont@example.com',
  phone: '+33 6 12 34 56 78',
  company: 'Tech Solutions',
  position: 'Marketing Director',
  location: 'Paris, France',
  website: 'https://techsolutions.com',
  linkedIn: 'https://linkedin.com/in/emmadupont',
  status: 'Qualified' as const,
  tags: ['Marketing', 'Tech', 'Decision Maker'],
  notes: "Emma a montré un intérêt pour notre solution de marketing automation. Elle est particulièrement intéressée par les fonctionnalités d'analyse de données et de segmentation client."
};

const Contacts: React.FC = () => {
  const [view, setView] = useState<'list' | 'grid'>('list');
  
  return (
    <div className="p-6 max-w-7xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Contacts</h1>
        
        <div className="flex items-center gap-2">
          <div className="border border-border rounded-md p-0.5 flex">
            <Button 
              variant={view === 'list' ? 'default' : 'ghost'} 
              size="sm"
              className="rounded"
              onClick={() => setView('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant={view === 'grid' ? 'default' : 'ghost'} 
              size="sm"
              className="rounded"
              onClick={() => setView('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="qualified">Qualifiés</TabsTrigger>
          <TabsTrigger value="customers">Clients</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {view === 'list' ? (
        <ContactsList />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ContactCard contact={mockContact} />
          
          <ContactCard contact={{
            ...mockContact,
            id: '2',
            name: 'Laurent Martin',
            email: 'laurent.martin@example.com',
            phone: '+33 6 23 45 67 89',
            company: 'Global Innovations',
            position: 'CEO',
            status: 'Lead'
          }} />
          
          <ContactCard contact={{
            ...mockContact,
            id: '3',
            name: 'Sophie Bernard',
            email: 'sophie.bernard@example.com',
            phone: '+33 6 34 56 78 90',
            company: 'Creative Design',
            position: 'Art Director',
            status: 'Customer',
            tags: ['Design', 'Creative']
          }} />
          
          <ContactCard contact={{
            ...mockContact,
            id: '4',
            name: 'Alexandre Petit',
            email: 'alexandre.petit@example.com',
            phone: '+33 6 45 67 89 01',
            company: 'Data Analytics',
            position: 'Data Scientist',
            status: 'Lead',
            tags: ['Tech', 'Analytics']
          }} />
          
          <ContactCard contact={{
            ...mockContact,
            id: '5',
            name: 'Camille Dubois',
            email: 'camille.dubois@example.com',
            phone: '+33 6 56 78 90 12',
            company: 'Eco Solutions',
            position: 'Sustainability Officer',
            status: 'Churned',
            tags: ['Green Tech', 'Sustainability']
          }} />
        </div>
      )}
    </div>
  );
};

export default Contacts;
