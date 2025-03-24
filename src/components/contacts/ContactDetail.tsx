
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Contact } from '@/types/contact';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Facebook, 
  Twitter, 
  Instagram, 
  MapPin, 
  Building, 
  Calendar, 
  User, 
  Globe, 
  FileText
} from 'lucide-react';

interface ContactDetailProps {
  contact: Contact;
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

const ContactDetail: React.FC<ContactDetailProps> = ({ contact }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-semibold text-primary">
            {contact.first_name?.[0]}{contact.last_name?.[0]}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{contact.first_name} {contact.last_name}</h2>
            <div className="flex items-center gap-2 mt-1">
              {contact.job_title && <span className="text-muted-foreground">{contact.job_title}</span>}
              {contact.company_name && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{contact.company_name}</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <Badge className={cn(
          "rounded-full",
          statusColors[contact.status]
        )}>
          {statusLabels[contact.status]}
        </Badge>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          <Mail className="h-4 w-4 mr-2" />
          <span>Envoyer un email</span>
        </Button>
        <Button variant="outline" size="sm">
          <Phone className="h-4 w-4 mr-2" />
          <span>Appeler</span>
        </Button>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Planifier</span>
        </Button>
        {contact.linkedin && (
          <Button variant="outline" size="sm">
            <Linkedin className="h-4 w-4 mr-2" />
            <span>LinkedIn</span>
          </Button>
        )}
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="activities">Activités</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Informations de contact</h3>
                <div className="space-y-3">
                  {contact.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p>{contact.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {contact.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Téléphone fixe</p>
                        <p>{contact.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {contact.mobile_phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Téléphone mobile</p>
                        <p>{contact.mobile_phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {(contact.address || contact.city || contact.postal_code || contact.country) && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Adresse</h3>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      {contact.address && <p>{contact.address}</p>}
                      {contact.address_complement && <p>{contact.address_complement}</p>}
                      {(contact.postal_code || contact.city) && (
                        <p>{contact.postal_code} {contact.city}</p>
                      )}
                      {(contact.state || contact.country) && (
                        <p>{contact.state} {contact.country}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {(contact.company_name || contact.job_title) && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Informations professionnelles</h3>
                  <div className="space-y-3">
                    {contact.company_name && (
                      <div className="flex items-center gap-3">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Entreprise</p>
                          <p>{contact.company_name}</p>
                        </div>
                      </div>
                    )}
                    
                    {contact.job_title && (
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Fonction</p>
                          <p>{contact.job_title}</p>
                        </div>
                      </div>
                    )}
                    
                    {contact.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Site web</p>
                          <a href={contact.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {contact.website}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              {(contact.linkedin || contact.facebook || contact.twitter || contact.instagram) && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Réseaux sociaux</h3>
                  <div className="space-y-3">
                    {contact.linkedin && (
                      <div className="flex items-center gap-3">
                        <Linkedin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">LinkedIn</p>
                          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {contact.linkedin}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {contact.facebook && (
                      <div className="flex items-center gap-3">
                        <Facebook className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Facebook</p>
                          <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {contact.facebook}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {contact.twitter && (
                      <div className="flex items-center gap-3">
                        <Twitter className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Twitter</p>
                          <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {contact.twitter}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {contact.instagram && (
                      <div className="flex items-center gap-3">
                        <Instagram className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Instagram</p>
                          <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {contact.instagram}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {contact.notes && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Notes</h3>
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-start gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <p className="text-sm">{contact.notes}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-medium mb-3">Informations additionnelles</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Propriétaire du contact</p>
                      <p>Vous</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Créé le</p>
                      <p>{new Date(contact.created_at || '').toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="activities" className="mt-6">
          <div className="text-center p-8 border rounded-lg border-dashed">
            <h3 className="text-lg font-medium mb-2">Aucune activité enregistrée</h3>
            <p className="text-muted-foreground mb-4">Commencez à suivre vos interactions avec ce contact</p>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              <span>Ajouter une activité</span>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-6">
          {contact.notes ? (
            <div className="border rounded-lg p-4 bg-muted/30">
              <div className="flex items-start gap-3">
                <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm">{contact.notes}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Ajouté le {new Date(contact.created_at || '').toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 border rounded-lg border-dashed">
              <h3 className="text-lg font-medium mb-2">Aucune note</h3>
              <p className="text-muted-foreground mb-4">Ajoutez des notes pour ce contact</p>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                <span>Ajouter une note</span>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContactDetail;
