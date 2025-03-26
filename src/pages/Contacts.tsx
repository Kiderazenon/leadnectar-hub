
import React, { useState, useEffect } from 'react';
import ContactsList from '@/components/contacts/ContactsList';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid3X3, List, UserPlus } from 'lucide-react';
import AddContactDialog from '@/components/contacts/AddContactDialog';
import { useAuth } from '@/context/AuthContext';

const Contacts: React.FC = () => {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [activeTab, setActiveTab] = useState('all');
  const { user } = useAuth();
  
  useEffect(() => {
    console.log("Contacts page mounted, authenticated user:", !!user);
  }, [user]);
  
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
          
          <AddContactDialog 
            trigger={
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                <span>Ajouter un contact</span>
              </Button>
            }
          />
        </div>
      </div>
      
      <Tabs 
        defaultValue="all" 
        className="mb-6"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList>
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="qualified">Qualifiés</TabsTrigger>
          <TabsTrigger value="customers">Clients</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {view === 'list' ? (
        <ContactsList filter={activeTab} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AddContactDialog 
            trigger={
              <Button 
                variant="outline" 
                className="h-full min-h-[250px] flex flex-col items-center justify-center border-dashed"
              >
                <UserPlus className="h-10 w-10 mb-4 text-muted-foreground" />
                <span className="text-muted-foreground">Ajouter un contact</span>
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
};

export default Contacts;
