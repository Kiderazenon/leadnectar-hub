
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { Loader } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const { signIn, signUp, user, loading } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // États pour la connexion
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  
  // États pour l'inscription
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirm, setRegisterConfirm] = useState('');
  const [registerFirstname, setRegisterFirstname] = useState('');
  const [registerLastname, setRegisterLastname] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  
  // Si l'utilisateur est connecté, rediriger vers le tableau de bord
  if (user && !loading) {
    return <Navigate to="/dashboard" replace />;
  }
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      return;
    }
    
    try {
      setLoginLoading(true);
      await signIn(loginEmail, loginPassword);
    } catch (error) {
      console.error(error);
    } finally {
      setLoginLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerEmail || !registerPassword || !registerConfirm || !registerFirstname || !registerLastname) {
      return;
    }
    
    if (registerPassword !== registerConfirm) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    try {
      setRegisterLoading(true);
      await signUp(registerEmail, registerPassword, registerFirstname, registerLastname);
      setActiveTab('login');
    } catch (error) {
      console.error(error);
    } finally {
      setRegisterLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Lead<span className="text-primary">Nectar</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Plateforme de gestion de la relation client et marketing multicanal
          </p>
        </div>
        
        <Card className="glass-card border border-border/50">
          <CardHeader>
            <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="pt-4">
                <CardTitle>Connexion</CardTitle>
                <CardDescription>
                  Connectez-vous à votre compte LeadNectar
                </CardDescription>
              </TabsContent>
              
              <TabsContent value="register" className="pt-4">
                <CardTitle>Inscription</CardTitle>
                <CardDescription>
                  Créez un nouveau compte sur LeadNectar
                </CardDescription>
              </TabsContent>
            </Tabs>
          </CardHeader>
          
          <CardContent>
            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input 
                    id="login-email" 
                    type="email" 
                    placeholder="votre@email.com" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="login-password">Mot de passe</Label>
                    <Button type="button" variant="link" className="px-0 h-auto text-xs">
                      Mot de passe oublié ?
                    </Button>
                  </div>
                  <Input 
                    id="login-password" 
                    type="password" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loginLoading}>
                  {loginLoading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Connexion en cours...
                    </>
                  ) : 'Se connecter'}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-firstname">Prénom</Label>
                    <Input 
                      id="register-firstname" 
                      placeholder="Prénom" 
                      value={registerFirstname}
                      onChange={(e) => setRegisterFirstname(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-lastname">Nom</Label>
                    <Input 
                      id="register-lastname" 
                      placeholder="Nom" 
                      value={registerLastname}
                      onChange={(e) => setRegisterLastname(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="votre@email.com" 
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password">Mot de passe</Label>
                  <Input 
                    id="register-password" 
                    type="password" 
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-confirm">Confirmer le mot de passe</Label>
                  <Input 
                    id="register-confirm" 
                    type="password" 
                    value={registerConfirm}
                    onChange={(e) => setRegisterConfirm(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={registerLoading}>
                  {registerLoading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Inscription en cours...
                    </>
                  ) : "S'inscrire"}
                </Button>
              </form>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm text-muted-foreground">
              En continuant, vous acceptez les{' '}
              <Button variant="link" className="h-auto p-0">
                Conditions d'utilisation
              </Button>{' '}
              et la{' '}
              <Button variant="link" className="h-auto p-0">
                Politique de confidentialité
              </Button>.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
