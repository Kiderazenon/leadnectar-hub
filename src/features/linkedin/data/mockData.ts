
import { LinkedInConnection, LinkedInTemplate, LinkedInCampaign } from '../types';

export const mockConnections: LinkedInConnection[] = [
  { 
    id: '1', 
    name: 'Sophie Martin', 
    position: 'Marketing Director', 
    company: 'InnoTech Solutions', 
    status: 'connected', 
    lastActivity: '2023-11-10',
    notes: 'Intéressée par notre solution de CRM'
  },
  { 
    id: '2', 
    name: 'Jean Dupont', 
    position: 'CTO', 
    company: 'Digital Forge', 
    status: 'pending', 
    lastActivity: '2023-11-12',
    notes: ''
  },
  { 
    id: '3', 
    name: 'Marie Laurent', 
    position: 'CEO', 
    company: 'Global Innovations', 
    status: 'connected', 
    lastActivity: '2023-11-08',
    notes: 'A demandé une démo pour janvier'
  },
  { 
    id: '4', 
    name: 'Thomas Bernard', 
    position: 'Sales Director', 
    company: 'Tech Solutions', 
    status: 'messaged', 
    lastActivity: '2023-11-14',
    notes: 'En attente de réponse à notre proposition'
  },
  { 
    id: '5', 
    name: 'Claire Moreau', 
    position: 'Product Manager', 
    company: 'Smart Systems', 
    status: 'connected', 
    lastActivity: '2023-11-09',
    notes: ''
  }
];

export const mockTemplates: LinkedInTemplate[] = [
  {
    id: '1',
    name: 'Invitation de connexion',
    content: 'Bonjour {{first_name}}, je souhaiterais vous ajouter à mon réseau professionnel. Au plaisir d\'échanger avec vous.',
    type: 'connection'
  },
  {
    id: '2',
    name: 'Suivi après connexion',
    content: 'Bonjour {{first_name}}, merci d\'avoir accepté ma demande de connexion. Je serais intéressé d\'en savoir plus sur vos besoins en matière de {{topic}}.',
    type: 'follow-up'
  },
  {
    id: '3',
    name: 'Présentation produit',
    content: 'Bonjour {{first_name}}, je voulais vous présenter notre solution LeadNectar qui pourrait répondre aux besoins de {{company}} en matière de prospection commerciale.',
    type: 'pitch'
  }
];

export const mockCampaigns: LinkedInCampaign[] = [
  {
    id: '1',
    name: 'Prospection DSI',
    status: 'active',
    audience: 'CTO, DSI, IT Director',
    progress: {
      sent: 45,
      accepted: 22,
      replied: 15
    },
    template: 'Invitation de connexion',
    startDate: '2023-11-01'
  },
  {
    id: '2',
    name: 'Suivi Marketing',
    status: 'paused',
    audience: 'CMO, Marketing Manager, Digital Marketing',
    progress: {
      sent: 30,
      accepted: 18,
      replied: 9
    },
    template: 'Suivi après connexion',
    startDate: '2023-11-05'
  }
];
