
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Check, BarChart3, Users, Mail, Linkedin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 border-b border-border/50 backdrop-blur-md bg-background/95 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-bold text-2xl">
            Lead<span className="text-primary">Nectar</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Fonctionnalités
            </a>
            <a href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">
              Avantages
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Tarifs
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline">
              <Link to="/dashboard">Connexion</Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard">Essai gratuit</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="flex items-center bg-muted/80 rounded-full px-3 py-1 text-sm border border-border/50 shadow-sm animate-fade-in">
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                  Nouveau
                </span>
                <span className="ml-2">Lancé le 1er novembre 2023</span>
                <ChevronRight className="h-4 w-4 ml-1 text-primary" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              <span className="inline-block">CRM + Marketing Multicanal</span><br /> 
              <span className="inline-block bg-gradient-to-r from-primary to-blue-400 text-transparent bg-clip-text">
                Tout en un
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in">
              Centralisez vos contacts, automatisez vos campagnes et boostez vos conversions grâce à notre plateforme de prospection multicanal.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in">
              <Button asChild size="lg" className="h-12 px-8 rounded-lg text-base">
                <Link to="/dashboard">Démarrer gratuitement</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 rounded-lg text-base">
                <Link to="/dashboard">Voir la démo</Link>
              </Button>
            </div>
            
            <div className="glass-card overflow-hidden rounded-xl border border-border/50 shadow-glass animate-scale-in">
              <img 
                src="https://placehold.co/1200x700/e9ecef/868e96?text=Dashboard+screenshot" 
                alt="Dashboard LeadNectar" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>
        
        <section id="features" className="py-20 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
                Une solution complète pour votre prospection
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
                Tout ce dont vous avez besoin pour gérer, suivre et optimiser vos efforts de prospection.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: "Gestion des contacts",
                  description: "Base de données centralisée avec segmentation avancée et import/export facile."
                },
                {
                  icon: <Mail className="h-10 w-10 text-primary" />,
                  title: "Cold emailing",
                  description: "Envoi d'emails personnalisés en masse avec suivi des taux d'ouverture et de réponse."
                },
                {
                  icon: <Linkedin className="h-10 w-10 text-primary" />,
                  title: "Intégration LinkedIn",
                  description: "Connectez votre compte LinkedIn pour automatiser vos messages de prospection."
                },
                {
                  icon: <BarChart3 className="h-10 w-10 text-primary" />,
                  title: "Analytics avancés",
                  description: "Tableaux de bord détaillés pour analyser vos performances de prospection."
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "glass-card p-6 border border-border/50 rounded-lg transition-all duration-500",
                    "animate-scale-in"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-primary/10 rounded-full p-3 inline-flex mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="benefits" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
                Pourquoi choisir LeadNectar?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
                Optimisez votre processus de prospection et augmentez vos conversions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8 lg:mt-12 animate-fade-in">
                {[
                  {
                    title: "Gagnez du temps",
                    description: "Automatisez vos tâches répétitives et concentrez-vous sur ce qui compte vraiment."
                  },
                  {
                    title: "Augmentez vos conversions",
                    description: "Suivez vos leads à travers chaque étape du pipeline et maximisez vos chances de conversion."
                  },
                  {
                    title: "Approche multicanal",
                    description: "Combinez email et LinkedIn pour une stratégie de prospection plus efficace."
                  },
                  {
                    title: "Data-driven",
                    description: "Prenez des décisions basées sur des données précises et améliorez constamment vos performances."
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 bg-primary/10 rounded-full p-1">
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="glass-card rounded-xl border border-border/50 shadow-glass overflow-hidden animate-scale-in">
                <img 
                  src="https://placehold.co/600x400/e9ecef/868e96?text=Platform+screenshot" 
                  alt="LeadNectar Platform" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section id="pricing" className="py-20 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
                Tarifs simples et transparents
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
                Choisissez le plan qui correspond à vos besoins de prospection.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Débutant",
                  price: "29€",
                  description: "Idéal pour les entrepreneurs et freelances",
                  features: [
                    "500 contacts",
                    "1,000 emails/mois",
                    "Intégration LinkedIn basique",
                    "Pipeline de vente",
                    "Support par email"
                  ],
                  buttonText: "Essai gratuit",
                  highlighted: false
                },
                {
                  title: "Pro",
                  price: "79€",
                  description: "Pour les équipes commerciales en croissance",
                  features: [
                    "2,500 contacts",
                    "5,000 emails/mois",
                    "Intégration LinkedIn avancée",
                    "Séquences d'emails",
                    "Analytics avancés",
                    "Support prioritaire"
                  ],
                  buttonText: "Essai gratuit",
                  highlighted: true
                },
                {
                  title: "Entreprise",
                  price: "199€",
                  description: "Pour les grandes équipes avec besoins spécifiques",
                  features: [
                    "10,000 contacts",
                    "Emails illimités",
                    "Intégration LinkedIn complète",
                    "API et intégrations personnalisées",
                    "Formations dédiées",
                    "Support dédié"
                  ],
                  buttonText: "Nous contacter",
                  highlighted: false
                }
              ].map((plan, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "glass-card rounded-xl border overflow-hidden transition-all duration-300 animate-scale-in",
                    plan.highlighted 
                      ? "border-primary shadow-lg scale-105 lg:scale-110 z-10 relative" 
                      : "border-border/50"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {plan.highlighted && (
                    <div className="bg-primary text-white py-1.5 px-4 text-sm font-medium text-center">
                      Populaire
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground"> /mois</span>
                    </div>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="h-5 w-5 text-primary mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      asChild
                      className={cn(
                        "w-full", 
                        plan.highlighted ? "" : "bg-muted hover:bg-muted/80 text-foreground"
                      )}
                      variant={plan.highlighted ? "default" : "outline"}
                    >
                      <Link to="/dashboard">{plan.buttonText}</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card rounded-xl border border-border/50 text-center p-12 animate-scale-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Prêt à booster votre prospection?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Rejoignez les milliers d'entreprises qui utilisent LeadNectar pour optimiser leur prospection et augmenter leurs ventes.
              </p>
              <Button asChild size="lg" className="h-12 px-8 rounded-lg text-base">
                <Link to="/dashboard" className="flex items-center">
                  <span>Commencer maintenant</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-muted/30 border-t border-border/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-2xl mb-4">
                Lead<span className="text-primary">Nectar</span>
              </div>
              <p className="text-muted-foreground mb-4">
                La plateforme de prospection multicanal tout-en-un pour booster vos ventes.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Produit</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Fonctionnalités</a></li>
                <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Tarifs</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Ressources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Webinaires</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Entreprise</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">À propos</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Carrières</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-muted-foreground">
              © 2023 LeadNectar. Tous droits réservés.
            </p>
            
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Conditions d'utilisation</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
