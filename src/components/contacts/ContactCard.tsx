
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Linkedin, Globe, MapPin, Building, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Contact } from '@/types/contact';

interface ContactCardProps {
  contact: Contact;
  className?: string;
  onView?: (contact: Contact) => void;
  onEdit?: (contact: Contact) => void;
  onDelete?: (contact: Contact) => void;
}

const statusColors = {
  lead: 'bg-blue-500/10 text-blue-600',
  qualified: 'bg-amber-500/10 text-amber-600',
  customer: 'bg-green-500/10 text-green-600',
  churned: 'bg-red-500/10 text-red-600'
};

const statusLabels = {
  lead: 'Lead',
  qualified: 'Qualifié',
  customer: 'Client',
  churned: 'Perdu'
};

const ContactCard: React.FC<ContactCardProps> = ({ 
  contact, 
  className,
  onView,
  onEdit,
  onDelete
}) => {
  return (
    <Card className={cn("glass-card overflow-hidden border border-border/50 animate-scale-in", className)}>
      <CardHeader className="pb-0">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={cn(
            "rounded-full font-normal",
            statusColors[contact.status]
          )}>
            {statusLabels[contact.status]}
          </Badge>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => onView && onView(contact)}
              >
                Voir
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => onEdit && onEdit(contact)}
              >
                Modifier
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-destructive"
                onClick={() => onDelete && onDelete(contact)}
              >
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-3">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="" alt={`${contact.first_name} ${contact.last_name}`} />
            <AvatarFallback className="text-xl font-medium">
              {`${contact.first_name?.[0] || ''}${contact.last_name?.[0] || ''}`}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <CardTitle className="text-xl mb-1">{contact.first_name} {contact.last_name}</CardTitle>
            <p className="text-muted-foreground">{contact.job_title || 'Non spécifié'}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {contact.company_name && (
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span>{contact.company_name}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
              {contact.email}
            </a>
          </div>
          
          {contact.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${contact.phone}`} className="hover:underline">
                {contact.phone}
              </a>
            </div>
          )}
          
          {(contact.city || contact.country) && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{[contact.city, contact.country].filter(Boolean).join(', ')}</span>
            </div>
          )}
          
          {contact.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a href={contact.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate max-w-[180px]">
                {contact.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          
          {contact.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 text-muted-foreground" />
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate max-w-[180px]">
                {contact.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\//, '')}
              </a>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border flex justify-between">
          <Button variant="outline" size="sm" className="w-[32%]">
            <Phone className="h-4 w-4 mr-1" />
            <span>Appeler</span>
          </Button>
          <Button variant="outline" size="sm" className="w-[32%]">
            <Mail className="h-4 w-4 mr-1" />
            <span>Email</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-[32%]"
            onClick={() => onView && onView(contact)}
          >
            <span>Voir</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
