
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Pipeline from "./pages/Pipeline";
import Campaigns from "./pages/Campaigns";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import LinkedIn from "./pages/LinkedIn";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AuthGuard from "./components/auth/AuthGuard";
import { AuthProvider } from "./context/AuthContext";
import AppLayout from "./components/layout/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            <Route 
              path="/dashboard" 
              element={
                <AuthGuard>
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                </AuthGuard>
              } 
            />
            <Route 
              path="/contacts" 
              element={
                <AuthGuard>
                  <AppLayout>
                    <Contacts />
                  </AppLayout>
                </AuthGuard>
              } 
            />
            <Route 
              path="/pipeline" 
              element={
                <AuthGuard>
                  <AppLayout>
                    <Pipeline />
                  </AppLayout>
                </AuthGuard>
              } 
            />
            <Route 
              path="/campaigns" 
              element={
                <AuthGuard>
                  <AppLayout>
                    <Campaigns />
                  </AppLayout>
                </AuthGuard>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <AuthGuard>
                  <AppLayout>
                    <Settings />
                  </AppLayout>
                </AuthGuard>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <AuthGuard adminOnly={true}>
                  <AppLayout>
                    <Admin />
                  </AppLayout>
                </AuthGuard>
              } 
            />
            <Route 
              path="/linkedin" 
              element={
                <AuthGuard>
                  <AppLayout>
                    <LinkedIn />
                  </AppLayout>
                </AuthGuard>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
