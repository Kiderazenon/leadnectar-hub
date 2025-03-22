
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminEmailTemplates from '@/components/admin/AdminEmailTemplates';
import AdminIntegrations from '@/components/admin/AdminIntegrations';
import { Shield } from 'lucide-react';

const Admin: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-semibold">Administration</h1>
        </div>
        <Button variant="outline">Consulter les journaux d'activité</Button>
      </div>
      
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="templates">Modèles d'emails</TabsTrigger>
          <TabsTrigger value="integrations">Intégrations</TabsTrigger>
          <TabsTrigger value="settings">Paramètres généraux</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-6">
          <AdminUsers />
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-6">
          <AdminEmailTemplates />
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-6">
          <AdminIntegrations />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <AdminSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
