
import React, { useState, useEffect } from 'react';
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
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type User = {
  id: string;
  email: string;
  user_metadata?: {
    firstname?: string;
    lastname?: string;
  };
  role?: string;
  created_at: string;
  last_sign_in_at: string | null;
  profile?: {
    firstname: string;
    lastname: string;
    role: string;
  };
};

const AdminUsers: React.FC = () => {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // États pour le nouvel utilisateur
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserFirstname, setNewUserFirstname] = useState('');
  const [newUserLastname, setNewUserLastname] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');
  const [newUserActive, setNewUserActive] = useState(true);
  
  // États pour la modification
  const [editEmail, setEditEmail] = useState('');
  const [editFirstname, setEditFirstname] = useState('');
  const [editLastname, setEditLastname] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editActive, setEditActive] = useState(true);
  
  // Chargement des utilisateurs
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      
      // 1. Récupérer les utilisateurs
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        throw authError;
      }
      
      // 2. Récupérer les profils
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
      
      if (profilesError) {
        throw profilesError;
      }
      
      // 3. Fusionner les données
      const mergedUsers = authUsers.users.map(user => {
        const profile = profiles.find(p => p.id === user.id);
        return {
          ...user,
          profile,
          role: profile?.role || 'user'
        };
      });
      
      setUsers(mergedUsers);
    } catch (error: any) {
      toast.error(`Erreur lors du chargement des utilisateurs: ${error.message}`);
      console.error('Erreur lors du chargement des utilisateurs:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const filteredUsers = users.filter(user => {
    const fullName = `${user.profile?.firstname || ''} ${user.profile?.lastname || ''}`.toLowerCase();
    const email = user.email.toLowerCase();
    const query = searchQuery.toLowerCase();
    
    return fullName.includes(query) || email.includes(query);
  });
  
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditEmail(user.email);
    setEditFirstname(user.profile?.firstname || '');
    setEditLastname(user.profile?.lastname || '');
    setEditRole(user.profile?.role || 'user');
    setEditActive(true); // À ajuster si l'état actif est disponible
  };
  
  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    
    try {
      setIsUpdating(true);
      
      // Mettre à jour le profil
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          firstname: editFirstname,
          lastname: editLastname,
          role: editRole,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedUser.id);
      
      if (profileError) {
        throw profileError;
      }
      
      toast.success('Utilisateur mis à jour avec succès');
      await fetchUsers();
      setSelectedUser(null);
    } catch (error: any) {
      toast.error(`Erreur lors de la mise à jour: ${error.message}`);
      console.error('Erreur lors de la mise à jour:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleAddUser = async () => {
    try {
      setIsUpdating(true);
      
      // 1. Créer l'utilisateur dans Auth
      const { data, error } = await supabase.auth.admin.createUser({
        email: newUserEmail,
        password: newUserPassword,
        email_confirm: true,
        user_metadata: {
          firstname: newUserFirstname,
          lastname: newUserLastname
        }
      });
      
      if (error) {
        throw error;
      }
      
      // 2. Mettre à jour le rôle dans le profil
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            firstname: newUserFirstname,
            lastname: newUserLastname,
            role: newUserRole
          })
          .eq('id', data.user.id);
        
        if (profileError) {
          throw profileError;
        }
      }
      
      toast.success('Utilisateur ajouté avec succès');
      await fetchUsers();
      
      // Réinitialiser le formulaire
      setNewUserEmail('');
      setNewUserPassword('');
      setNewUserFirstname('');
      setNewUserLastname('');
      setNewUserRole('user');
      setNewUserActive(true);
    } catch (error: any) {
      toast.error(`Erreur lors de l'ajout: ${error.message}`);
      console.error('Erreur lors de l\'ajout:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }
    
    try {
      // Supprimer l'utilisateur
      const { error } = await supabase.auth.admin.deleteUser(userId);
      
      if (error) {
        throw error;
      }
      
      toast.success('Utilisateur supprimé avec succès');
      setUsers(users.filter(user => user.id !== userId));
    } catch (error: any) {
      toast.error(`Erreur lors de la suppression: ${error.message}`);
      console.error('Erreur lors de la suppression:', error);
    }
  };
  
  if (!isAdmin) {
    return (
      <Card className="glass-card border border-border/50">
        <CardHeader>
          <CardTitle>Accès restreint</CardTitle>
          <CardDescription>
            Vous n'avez pas les permissions nécessaires pour accéder à cette section.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <>
      <Card className="glass-card border border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gestion des utilisateurs</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Ajouter un utilisateur
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Ajouter un utilisateur</DialogTitle>
                  <DialogDescription>
                    Créez un nouvel utilisateur avec les informations et les permissions appropriées.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 items-center gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstname">Prénom</Label>
                      <Input 
                        id="firstname" 
                        value={newUserFirstname} 
                        onChange={(e) => setNewUserFirstname(e.target.value)} 
                        placeholder="Prénom"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastname">Nom</Label>
                      <Input 
                        id="lastname" 
                        value={newUserLastname} 
                        onChange={(e) => setNewUserLastname(e.target.value)} 
                        placeholder="Nom"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={newUserEmail} 
                      onChange={(e) => setNewUserEmail(e.target.value)} 
                      placeholder="exemple@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe temporaire</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      value={newUserPassword} 
                      onChange={(e) => setNewUserPassword(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Rôle</Label>
                    <Select value={newUserRole} onValueChange={setNewUserRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Utilisateur</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="admin">Administrateur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="active" 
                      checked={newUserActive} 
                      onCheckedChange={setNewUserActive} 
                    />
                    <Label htmlFor="active">Compte actif</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddUser} disabled={isUpdating}>
                    {isUpdating ? 'Ajout en cours...' : 'Ajouter l\'utilisateur'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
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
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Aucun utilisateur trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.profile?.firstname || user.user_metadata?.firstname || ''} {user.profile?.lastname || user.user_metadata?.lastname || ''}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'manager' ? 'default' : 'outline'}>
                          {user.role === 'admin' ? 'Administrateur' : user.role === 'manager' ? 'Manager' : 'Utilisateur'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="success">
                          Actif
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.last_sign_in_at 
                          ? new Date(user.last_sign_in_at).toLocaleString('fr-FR') 
                          : 'Jamais connecté'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Modifier l'utilisateur</DialogTitle>
                                <DialogDescription>
                                  Modifiez les informations et les permissions de l'utilisateur.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 items-center gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-firstname">Prénom</Label>
                                    <Input 
                                      id="edit-firstname" 
                                      value={editFirstname} 
                                      onChange={(e) => setEditFirstname(e.target.value)} 
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-lastname">Nom</Label>
                                    <Input 
                                      id="edit-lastname" 
                                      value={editLastname} 
                                      onChange={(e) => setEditLastname(e.target.value)} 
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-email">Email</Label>
                                  <Input 
                                    id="edit-email" 
                                    value={editEmail} 
                                    onChange={(e) => setEditEmail(e.target.value)} 
                                    disabled 
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-role">Rôle</Label>
                                  <Select value={editRole} onValueChange={setEditRole}>
                                    <SelectTrigger id="edit-role">
                                      <SelectValue placeholder="Sélectionner un rôle" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="user">Utilisateur</SelectItem>
                                      <SelectItem value="manager">Manager</SelectItem>
                                      <SelectItem value="admin">Administrateur</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Switch 
                                    id="edit-active" 
                                    checked={editActive} 
                                    onCheckedChange={setEditActive} 
                                  />
                                  <Label htmlFor="edit-active">Compte actif</Label>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button onClick={handleUpdateUser} disabled={isUpdating}>
                                  {isUpdating ? 'Mise à jour...' : 'Enregistrer les modifications'}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
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
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default AdminUsers;
