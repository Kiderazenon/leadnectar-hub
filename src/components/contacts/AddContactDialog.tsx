
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ContactForm from './ContactForm';
import { ContactFormValues } from '@/types/contact';

interface AddContactDialogProps {
  trigger: React.ReactNode;
  onSuccess?: (contact: any) => void;
}

const AddContactDialog: React.FC<AddContactDialogProps> = ({ trigger, onSuccess }) => {
  const [open, setOpen] = React.useState(false);

  const handleSuccess = (contact: any) => {
    setOpen(false);
    if (onSuccess) {
      onSuccess(contact);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau contact</DialogTitle>
          <DialogDescription>
            Remplissez les informations ci-dessous pour créer un nouveau contact.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <ContactForm 
            onSuccess={handleSuccess} 
            onCancel={() => setOpen(false)} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddContactDialog;
