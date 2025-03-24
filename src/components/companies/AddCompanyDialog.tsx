
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CompanyForm from './CompanyForm';
import { CompanyFormValues } from '@/types/company';

interface AddCompanyDialogProps {
  trigger: React.ReactNode;
  onSuccess?: (company: any) => void;
}

const AddCompanyDialog: React.FC<AddCompanyDialogProps> = ({ trigger, onSuccess }) => {
  const [open, setOpen] = React.useState(false);

  const handleSuccess = (company: any) => {
    setOpen(false);
    if (onSuccess) {
      onSuccess(company);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle entreprise</DialogTitle>
          <DialogDescription>
            Remplissez les informations ci-dessous pour créer une nouvelle entreprise.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <CompanyForm 
            onSuccess={handleSuccess} 
            onCancel={() => setOpen(false)} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCompanyDialog;
