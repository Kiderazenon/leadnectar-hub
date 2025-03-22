
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

interface ContactCardProps {
  contact: {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    position: string;
    location?: string;
    website?: string;
    linkedIn?: string;
    status: 'Lead' | 'Qualified' | 'Customer' | 'Churned';
    tags: string[];
    notes?: string;
  };
  className?: string;
}

const statusColors = {
  Lead: 'bg-blue-500/10 text-blue-600',
  Qualified: 'bg-amber-500/10 text-amber-600',
  Customer: 'bg-green-500/10 text-green-600',
  Churned: 'bg-red-500/10 text-red-600'
};

const ContactCard: React.FC<ContactCardProps> = ({ contact, className }) => {
  return (
    <Card className={cn("glass-card overflow-hidden border border-border/50 animate-scale-in", className)}>
      <CardHeader className="pb-0">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={cn(
            "rounded-full font-normal",
            statusColors[contact.status]
          )}>
            {contact.status}
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
              <DropdownMenuItem className="cursor-pointer text-destructive">
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-3">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="" alt={contact.name} />
            <AvatarFallback className="text-xl font-medium">
              {contact.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <CardTitle className="text-xl mb-1">{contact.name}</CardTitle>
            <p className="text-muted-foreground">{contact.position}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span>{contact.company}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
              {contact.email}
            </a>
          </div>
          
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <a href={`tel:${contact.phone}`} className="hover:underline">
              {contact.phone}
            </a>
          </div>
          
          {contact.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{contact.location}</span>
            </div>
          )}
          
          {contact.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a href={contact.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {contact.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          
          {contact.linkedIn && (
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 text-muted-foreground" />
              <a href={contact.linkedIn} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {contact.linkedIn.replace(/^https?:\/\/(www\.)?linkedin\.com\//, '')}
              </a>
            </div>
          )}
        </div>
        
        {contact.tags.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Tags</p>
            <div className="flex flex-wrap gap-1">
              {contact.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="rounded-full font-normal text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {contact.notes && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm font-medium mb-1">Notes</p>
            <p className="text-sm text-muted-foreground">{contact.notes}</p>
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-border flex justify-between">
          <Button variant="outline" size="sm" className="w-[32%]">
            <Phone className="h-4 w-4 mr-1" />
            <span>Appeler</span>
          </Button>
          <Button variant="outline" size="sm" className="w-[32%]">
            <Mail className="h-4 w-4 mr-1" />
            <span>Email</span>
          </Button>
          <Button variant="outline" size="sm" className="w-[32%]">
            <Linkedin className="h-4 w-4 mr-1" />
            <span>LinkedIn</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
