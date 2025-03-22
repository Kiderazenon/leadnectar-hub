
export interface LinkedInConnection {
  id: string;
  name: string;
  position: string;
  company: string;
  status: 'connected' | 'pending' | 'messaged';
  lastActivity: string;
  notes: string;
}

export interface LinkedInTemplate {
  id: string;
  name: string;
  content: string;
  type: 'connection' | 'follow-up' | 'pitch';
}

export interface LinkedInCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused';
  audience: string;
  progress: {
    sent: number;
    accepted: number;
    replied: number;
  };
  template: string;
  startDate: string;
}

export const statusColors: Record<string, string> = {
  connected: 'bg-green-500/10 text-green-600',
  pending: 'bg-amber-500/10 text-amber-600',
  messaged: 'bg-blue-500/10 text-blue-600'
};
