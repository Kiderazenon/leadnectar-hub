
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'failed';
  type: 'email' | 'linkedin';
  contacts: number;
  progress: number;
  metrics: {
    sent: number;
    opened: number;
    clicked: number;
    replied: number;
  };
  schedule: {
    start: string;
    end?: string;
  };
  lastActivity: string;
}

interface CampaignFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (campaign: Partial<Campaign>) => void;
  campaign?: Campaign;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  campaign
}) => {
  const [formData, setFormData] = useState<Partial<Campaign>>(
    campaign || {
      name: '',
      type: 'email',
      status: 'draft',
      contacts: 0,
      progress: 0,
      metrics: {
        sent: 0,
        opened: 0,
        clicked: 0,
        replied: 0
      },
      schedule: {
        start: new Date().toISOString().split('T')[0]
      },
      lastActivity: new Date().toISOString()
    }
  );
  
  const [startDate, setStartDate] = useState<Date | undefined>(
    formData.schedule?.start ? new Date(formData.schedule.start) : undefined
  );
  
  const [endDate, setEndDate] = useState<Date | undefined>(
    formData.schedule?.end ? new Date(formData.schedule.end) : undefined
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      type: value as 'email' | 'linkedin'
    }));
  };
  
  const handleStartDateChange = (date?: Date) => {
    setStartDate(date);
    if (date) {
      setFormData(prev => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          start: date.toISOString().split('T')[0]
        }
      }));
    }
  };
  
  const handleEndDateChange = (date?: Date) => {
    setEndDate(date);
    if (date) {
      setFormData(prev => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          end: date.toISOString().split('T')[0]
        }
      }));
    } else {
      // Remove end date if none selected
      const newSchedule = { ...formData.schedule };
      delete newSchedule.end;
      setFormData(prev => ({
        ...prev,
        schedule: newSchedule
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: formData.id || `campaign-${Date.now()}`, // Generate ID if not exists
    });
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] glass-card">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{campaign ? 'Modifier la campagne' : 'Nouvelle campagne'}</DialogTitle>
            <DialogDescription>
              {campaign 
                ? 'Modifiez les détails de votre campagne ci-dessous.'
                : 'Remplissez les informations pour créer une nouvelle campagne.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom de la campagne</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Titre de votre campagne"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Type de campagne</Label>
              <RadioGroup 
                value={formData.type} 
                onValueChange={handleTypeChange}
                className="flex flex-row gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="linkedin" id="linkedin" />
                  <Label htmlFor="linkedin">LinkedIn</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Date de début</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, 'PPP', { locale: fr })
                      ) : (
                        <span>Choisir une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={startDate}
                      onSelect={handleStartDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid gap-2">
                <Label>Date de fin (optionnelle)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {endDate ? (
                        format(endDate, 'PPP', { locale: fr })
                      ) : (
                        <span>Choisir une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={endDate}
                      onSelect={handleEndDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              {campaign ? 'Enregistrer' : 'Créer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignForm;
