
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Upload, 
  UserPlus, 
  MoreHorizontal, 
  Mail,
  Linkedin,
  Phone
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  position: string;
  phone: string;
  status: 'Lead' | 'Qualified' | 'Customer' | 'Churned';
  linkedIn?: string;
  tags: string[];
  lastActivity: string;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Emma Dupont',
    email: 'emma.dupont@example.com',
    company: 'Tech Solutions',
    position: 'Marketing Director',
    phone: '+33 6 12 34 56 78',
    status: 'Qualified',
    linkedIn: 'linkedin.com/in/emmadupont',
    tags: ['Marketing', 'Tech'],
    lastActivity: '2023-11-01'
  },
  {
    id: '2',
    name: 'Laurent Martin',
    email: 'laurent.martin@example.com',
    company: 'Global Innovations',
    position: 'CEO',
    phone: '+33 6 23 45 67 89',
    status: 'Lead',
    linkedIn: 'linkedin.com/in/laurentmartin',
    tags: ['Decision Maker', 'Finance'],
    lastActivity: '2023-11-05'
  },
  {
    id: '3',
    name: 'Sophie Bernard',
    email: 'sophie.bernard@example.com',
    company: 'Creative Design',
    position: 'Art Director',
    phone: '+33 6 34 56 78 90',
    status: 'Customer',
    linkedIn: 'linkedin.com/in/sophiebernard',
    tags: ['Design', 'Creative'],
    lastActivity: '2023-11-10'
  },
  {
    id: '4',
    name: 'Alexandre Petit',
    email: 'alexandre.petit@example.com',
    company: 'Data Analytics',
    position: 'Data Scientist',
    phone: '+33 6 45 67 89 01',
    status: 'Lead',
    linkedIn: 'linkedin.com/in/alexandrepetit',
    tags: ['Tech', 'Analytics'],
    lastActivity: '2023-11-12'
  },
  {
    id: '5',
    name: 'Camille Dubois',
    email: 'camille.dubois@example.com',
    company: 'Eco Solutions',
    position: 'Sustainability Officer',
    phone: '+33 6 56 78 90 12',
    status: 'Churned',
    linkedIn: 'linkedin.com/in/camilledubois',
    tags: ['Green Tech', 'Sustainability'],
    lastActivity: '2023-11-15'
  }
];

const statusColors = {
  Lead: 'bg-blue-500/10 text-blue-600',
  Qualified: 'bg-amber-500/10 text-amber-600',
  Customer: 'bg-green-500/10 text-green-600',
  Churned: 'bg-red-500/10 text-red-600'
};

const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedContacts(contacts.map(contact => contact.id));
    } else {
      setSelectedContacts([]);
    }
  };
  
  const handleSelectContact = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedContacts(prev => [...prev, id]);
    } else {
      setSelectedContacts(prev => prev.filter(contactId => contactId !== id));
    }
  };
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-4 animate-scale-in">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Rechercher des contacts..." 
            className="pl-9 h-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass w-56">
              <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium mb-1.5">Status</p>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="qualified">Qualifié</SelectItem>
                    <SelectItem value="customer">Client</SelectItem>
                    <SelectItem value="churned">Perdu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium mb-1.5">Tags</p>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5">
                <Button className="w-full">Appliquer</Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                <span>Exporter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass w-40">
              <DropdownMenuItem className="cursor-pointer">
                <span>Excel (.xlsx)</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <span>CSV (.csv)</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            <span>Importer</span>
          </Button>
          
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            <span>Ajouter</span>
          </Button>
        </div>
      </div>
      
      <div className="glass-card rounded-lg overflow-hidden border border-border/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-4 py-3 text-left">
                  <Checkbox 
                    checked={selectedContacts.length === contacts.length}
                    onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                  />
                </th>
                <th className="px-4 py-3 text-left font-medium text-sm">Nom</th>
                <th className="px-4 py-3 text-left font-medium text-sm">Entreprise</th>
                <th className="px-4 py-3 text-left font-medium text-sm">Status</th>
                <th className="px-4 py-3 text-left font-medium text-sm">Tags</th>
                <th className="px-4 py-3 text-left font-medium text-sm">Dernière activité</th>
                <th className="px-4 py-3 text-center font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                    Aucun contact trouvé
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr 
                    key={contact.id} 
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <Checkbox 
                        checked={selectedContacts.includes(contact.id)}
                        onCheckedChange={(checked) => handleSelectContact(contact.id, checked as boolean)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" alt={contact.name} />
                          <AvatarFallback className="text-xs font-medium">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-muted-foreground">{contact.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">{contact.company}</div>
                        <div className="text-sm text-muted-foreground">{contact.position}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={cn(
                        "rounded-full font-normal",
                        statusColors[contact.status]
                      )}>
                        {contact.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="rounded-full font-normal text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        {new Date(contact.lastActivity).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Phone className="h-4 w-4" />
                        </Button>
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
                            <DropdownMenuItem className="cursor-pointer text-destructive">
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactsList;
