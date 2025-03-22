
import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Pipeline from "./pages/Pipeline";
import Campaigns from "./pages/Campaigns";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  // Don't show the app layout on the landing page
  if (location.pathname === '/') {
    return <>{children}</>;
  }
  
  return (
    <div className="min-h-screen flex">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      
      <div className="flex-1 flex flex-col">
        <Navbar onMenuToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <main className="flex-1 overflow-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/dashboard" 
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            } 
          />
          <Route 
            path="/contacts" 
            element={
              <AppLayout>
                <Contacts />
              </AppLayout>
            } 
          />
          <Route 
            path="/pipeline" 
            element={
              <AppLayout>
                <Pipeline />
              </AppLayout>
            } 
          />
          <Route 
            path="/campaigns" 
            element={
              <AppLayout>
                <Campaigns />
              </AppLayout>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <AppLayout>
                <Settings />
              </AppLayout>
            } 
          />
          <Route 
            path="/linkedin" 
            element={
              <AppLayout>
                <div className="p-6 max-w-7xl mx-auto animate-fade-in">
                  <h1 className="text-3xl font-semibold mb-6">LinkedIn</h1>
                  <div className="glass-card p-12 text-center">
                    <h2 className="text-2xl font-medium mb-4">Fonctionnalité en développement</h2>
                    <p className="text-muted-foreground">
                      L'intégration avec LinkedIn sera disponible prochainement.
                    </p>
                  </div>
                </div>
              </AppLayout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
