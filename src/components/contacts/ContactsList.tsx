
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Upload, 
  UserPlus, 
  MoreHorizontal, 
  Mail,
  Linkedin,
  Phone,
  Eye,
  Edit,
  Trash2,
  Loader2
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
import { supabase } from '@/integrations/supabase/client';
import { Contact } from '@/types/contact';
import AddContactDialog from './AddContactDialog';
import { toast } from 'sonner';

const statusColors = {
  lead: 'bg-blue-500/10 text-blue-600',
  qualified: 'bg-amber-500/10 text-amber-600',
  customer: 'bg-green-500/10 text-green-600',
  churned: 'bg-red-500/10 text-red-600'
};

const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    fetchContacts();
  }, []);
  
  const fetchContacts = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('contacts')
        .select('*');
        
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setContacts(data as Contact[]);
    } catch (error: any) {
      console.error('Erreur lors du chargement des contacts:', error);
      toast.error('Erreur lors du chargement des contacts');
    } finally {
      setLoading(false);
    }
  };
  
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
  
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setTimeout(() => {
      fetchContacts();
    }, 100);
  };
  
  const deleteContact = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setContacts(prev => prev.filter(contact => contact.id !== id));
      setSelectedContacts(prev => prev.filter(contactId => contactId !== id));
      toast.success('Contact supprimé avec succès');
    } catch (error: any) {
      console.error('Erreur lors de la suppression du contact:', error);
      toast.error('Erreur lors de la suppression du contact');
    }
  };
  
  const handleAddContact = () => {
    fetchContacts();
  };
  
  const filteredContacts = contacts.filter(contact => 
    (contact.first_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (contact.last_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (contact.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (contact.company_name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
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
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium mb-1.5">Status</p>
                <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
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
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5">
                <Button className="w-full" onClick={fetchContacts}>Appliquer</Button>
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
            <DropdownMenuContent align="end" className="w-40">
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
          
          <AddContactDialog 
            trigger={
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                <span>Ajouter</span>
              </Button>
            }
            onSuccess={handleAddContact}
          />
        </div>
      </div>
      
      <div className="glass-card rounded-lg overflow-hidden border border-border/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-4 py-3 text-left">
                  <Checkbox 
                    checked={selectedContacts.length === contacts.length && contacts.length > 0}
                    onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                  />
                </th>
                <th className="px-4 py-3 text-left font-medium text-sm">Nom</th>
                <th className="px-4 py-3 text-left font-medium text-sm">Entreprise</th>
                <th className="px-4 py-3 text-left font-medium text-sm">Status</th>
                <th className="px-4 py-3 text-left font-medium text-sm">Coordonnées</th>
                <th className="px-4 py-3 text-center font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center">
                    <div className="flex justify-center items-center">
                      <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                      <span>Chargement des contacts...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
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
                          <AvatarImage src="" alt={`${contact.first_name} ${contact.last_name}`} />
                          <AvatarFallback className="text-xs font-medium">
                            {`${contact.first_name?.[0] || ''}${contact.last_name?.[0] || ''}`}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{`${contact.first_name} ${contact.last_name}`}</div>
                          <div className="text-sm text-muted-foreground">{contact.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">{contact.company_name || '-'}</div>
                        <div className="text-sm text-muted-foreground">{contact.job_title || '-'}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={cn(
                        "rounded-full font-normal",
                        statusColors[contact.status]
                      )}>
                        {contact.status === 'lead' ? 'Lead' : 
                         contact.status === 'qualified' ? 'Qualifié' : 
                         contact.status === 'customer' ? 'Client' : 
                         'Perdu'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        {contact.email && (
                          <div className="text-sm flex items-center">
                            <Mail className="h-3 w-3 inline mr-1.5 text-muted-foreground" />
                            <span>{contact.email}</span>
                          </div>
                        )}
                        {contact.phone && (
                          <div className="text-sm flex items-center">
                            <Phone className="h-3 w-3 inline mr-1.5 text-muted-foreground" />
                            <span>{contact.phone}</span>
                          </div>
                        )}
                        {contact.mobile_phone && (
                          <div className="text-sm flex items-center">
                            <Phone className="h-3 w-3 inline mr-1.5 text-muted-foreground" />
                            <span>{contact.mobile_phone}</span>
                          </div>
                        )}
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
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem className="cursor-pointer flex items-center">
                              <Eye className="h-4 w-4 mr-2" />
                              <span>Voir</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer flex items-center">
                              <Edit className="h-4 w-4 mr-2" />
                              <span>Modifier</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="cursor-pointer text-destructive flex items-center"
                              onClick={() => deleteContact(contact.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              <span>Supprimer</span>
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
