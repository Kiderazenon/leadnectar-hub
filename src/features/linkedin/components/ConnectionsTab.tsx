
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, MessageCircle } from 'lucide-react';
import { LinkedInConnection, statusColors } from '../types';

interface ConnectionsTabProps {
  connections: LinkedInConnection[];
}

const ConnectionsTab: React.FC<ConnectionsTabProps> = ({ connections }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConnections = connections.filter(connection => 
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="glass-card border border-border/50">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <CardTitle>Vos connexions LinkedIn</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-8 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter manuellement
            </Button>
          </div>
        </div>
        <CardDescription>
          Gérez vos connexions LinkedIn et suivez vos interactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Poste & Entreprise</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Dernière activité</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredConnections.map(connection => (
              <TableRow key={connection.id}>
                <TableCell className="font-medium">{connection.name}</TableCell>
                <TableCell>
                  <div>
                    <div>{connection.position}</div>
                    <div className="text-muted-foreground text-sm">{connection.company}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[connection.status] || ""}>
                    {connection.status === 'connected' ? 'Connecté' : 
                    connection.status === 'pending' ? 'En attente' : 'Message envoyé'}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(connection.lastActivity).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ConnectionsTab;
