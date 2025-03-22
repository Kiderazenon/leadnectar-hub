
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus } from 'lucide-react';
import { LinkedInCampaign } from '../types';

interface CampaignsTabProps {
  campaigns: LinkedInCampaign[];
  onNewCampaign: () => void;
}

const CampaignsTab: React.FC<CampaignsTabProps> = ({ campaigns, onNewCampaign }) => {
  return (
    <Card className="glass-card border border-border/50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Campagnes LinkedIn</CardTitle>
          <Button onClick={onNewCampaign}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle campagne
          </Button>
        </div>
        <CardDescription>
          Gérez vos campagnes de prospection automatisées sur LinkedIn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {campaigns.map(campaign => (
            <Card key={campaign.id} className="border border-border/50">
              <CardContent className="pt-6">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{campaign.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Cible : {campaign.audience}
                    </p>
                    <Badge variant={campaign.status === 'active' ? 'success' : 'outline'}>
                      {campaign.status === 'active' ? 'Active' : 'En pause'}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">État :</span>
                      <Switch checked={campaign.status === 'active'} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Depuis le {new Date(campaign.startDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted/30 rounded-md">
                    <p className="text-sm text-muted-foreground">Invitations</p>
                    <p className="text-xl font-semibold">{campaign.progress.sent}</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-md">
                    <p className="text-sm text-muted-foreground">Acceptations</p>
                    <p className="text-xl font-semibold">{campaign.progress.accepted}</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-md">
                    <p className="text-sm text-muted-foreground">Réponses</p>
                    <p className="text-xl font-semibold">{campaign.progress.replied}</p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm">
                    Rapport
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignsTab;
