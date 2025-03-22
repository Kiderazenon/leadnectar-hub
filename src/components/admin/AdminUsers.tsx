
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Edit, Trash, UserCog } from 'lucide-react';
import { toast } from 'sonner';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Switch } from '@/components/ui/switch';

// Données factices pour les utilisateurs
const mockUsers = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    role: 'admin',
    status: 'active',
    lastActive: '2023-05-12T10:30:00',
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie.martin@example.com',
    role: 'user',
    status: 'active',
    lastActive: '2023-05-11T14:45:00',
  },
  {
    id: '3',
    name: 'Pierre Dubois',
    email: 'pierre.dubois@example.com',
    role: 'user',
    status: 'inactive',
    lastActive: '2023-04-28T09:15:00',
  },
  {
    id: '4',
    name: 'Sophie Bernard',
    email: 'sophie.bernard@example.com',
    role: 'manager',
    status: 'active',
    lastActive: '2023-05-10T16:20:00',
  },
];

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleEditUser = (user: any) => {
    setSelectedUser(user);
  };
  
  const handleDeleteUser = (userId: string) => {
    // Confirmation avant suppression
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(user => user.id !== userId));
      toast.success('Utilisateur supprimé avec succès');
    }
  };
  
  const handleUpdateUser = (updatedUser: any) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setSelectedUser(null);
    toast.success('Utilisateur mis à jour avec succès');
  };
  
  const handleAddUser = (newUser: any) => {
    const newId = (Math.max(...users.map(u => parseInt(u.id))) + 1).toString();
    setUsers([...users, { ...newUser, id: newId }]);
    toast.success('Utilisateur ajouté avec succès');
  };
  
  return (
    <>
      <Card className="glass-card border border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gestion des utilisateurs</CardTitle>
            <Drawer>
              <DrawerTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Ajouter un utilisateur
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Ajouter un utilisateur</DrawerTitle>
                  <DrawerDescription>
                    Créez un nouvel utilisateur avec les informations et les permissions appropriées.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Rôle</Label>
                      <select 
                        id="role" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="user">Utilisateur</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Administrateur</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe temporaire</Label>
                      <Input id="password" type="password" />
                    </div>
                    <div className="col-span-2 flex items-center space-x-2 pt-2">
                      <Switch id="active" />
                      <Label htmlFor="active">Compte actif</Label>
                    </div>
                  </div>
                </div>
                <DrawerFooter>
                  <Button 
                    onClick={() => {
                      // Simulation d'ajout d'utilisateur
                      handleAddUser({
                        name: 'Nouvel Utilisateur',
                        email: 'nouvel.utilisateur@example.com',
                        role: 'user',
                        status: 'active',
                        lastActive: new Date().toISOString(),
                      });
                    }}
                  >
                    Ajouter l'utilisateur
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Annuler</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          <CardDescription>
            Gérez les utilisateurs, leurs rôles et leurs permissions.
          </CardDescription>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un utilisateur..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière activité</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'manager' ? 'default' : 'outline'}>
                      {user.role === 'admin' ? 'Administrateur' : user.role === 'manager' ? 'Manager' : 'Utilisateur'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                      {user.status === 'active' ? 'Actif' : 'Inactif'}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.lastActive).toLocaleString('fr-FR')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Modifier l'utilisateur</DrawerTitle>
                            <DrawerDescription>
                              Modifiez les informations et les permissions de l'utilisateur.
                            </DrawerDescription>
                          </DrawerHeader>
                          <div className="p-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-name">Nom complet</Label>
                                <Input id="edit-name" defaultValue={user.name} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-email">Email</Label>
                                <Input id="edit-email" type="email" defaultValue={user.email} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-role">Rôle</Label>
                                <select 
                                  id="edit-role" 
                                  defaultValue={user.role}
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                  <option value="user">Utilisateur</option>
                                  <option value="manager">Manager</option>
                                  <option value="admin">Administrateur</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-status">Statut</Label>
                                <select 
                                  id="edit-status" 
                                  defaultValue={user.status}
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                  <option value="active">Actif</option>
                                  <option value="inactive">Inactif</option>
                                </select>
                              </div>
                              <div className="col-span-2 pt-2">
                                <Button variant="outline" className="w-full">
                                  <UserCog className="mr-2 h-4 w-4" />
                                  Gérer les permissions
                                </Button>
                              </div>
                            </div>
                          </div>
                          <DrawerFooter>
                            <Button 
                              onClick={() => {
                                // Simulation de mise à jour
                                const updatedUser = {
                                  ...user,
                                  name: user.name + ' (Modifié)',
                                };
                                handleUpdateUser(updatedUser);
                              }}
                            >
                              Enregistrer les modifications
                            </Button>
                            <DrawerClose asChild>
                              <Button variant="outline">Annuler</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default AdminUsers;
