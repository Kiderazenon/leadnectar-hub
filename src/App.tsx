
import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppLayout from "./components/layout/AppLayout";
import AuthGuard from "./components/auth/AuthGuard";
import { Loader } from "lucide-react";

// Fallback de chargement global
const GlobalLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center">
      <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
      <p>Chargement de l'application...</p>
    </div>
  </div>
);

// Importation des pages avec lazy loading
const Index = lazy(() => import('./pages/Index'));
const Auth = lazy(() => import('./pages/Auth'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Contacts = lazy(() => import('./pages/Contacts'));
const Pipeline = lazy(() => import('./pages/Pipeline'));
const Campaigns = lazy(() => import('./pages/Campaigns'));
const Settings = lazy(() => import('./pages/Settings'));
const Admin = lazy(() => import('./pages/Admin'));
const LinkedIn = lazy(() => import('./pages/LinkedIn'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<GlobalLoadingFallback />}>
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected Routes */}
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
              
              {/* Fallback pour les URL inconnues */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
