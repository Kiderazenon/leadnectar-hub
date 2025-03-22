
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';

interface ConnectLinkedInPromptProps {
  onConnect: () => void;
}

const ConnectLinkedInPrompt: React.FC<ConnectLinkedInPromptProps> = ({ onConnect }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted rounded-full p-4 mb-4">
            <Linkedin className="h-12 w-12 text-[#0077b5]" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Connectez votre compte LinkedIn</h2>
          <p className="text-muted-foreground max-w-md mb-6">
            Pour utiliser les fonctionnalités de marketing LinkedIn, vous devez connecter votre compte professionnel.
          </p>
          <Button className="bg-[#0077b5] hover:bg-[#0077b5]/90" onClick={onConnect}>
            <Linkedin className="mr-2 h-4 w-4" />
            Connecter maintenant
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectLinkedInPrompt;
