
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ContactDetail from './ContactDetail';
import { Contact } from '@/types/contact';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactDetailDialogProps {
  contact: Contact | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactDetailDialog: React.FC<ContactDetailDialogProps> = ({ 
  contact, 
  open, 
  onOpenChange 
}) => {
  if (!contact) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Détails du contact</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="mt-4">
          <ContactDetail contact={contact} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetailDialog;
