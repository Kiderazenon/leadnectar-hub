
export interface Contact {
  id: string;
  user_id: string;
  team_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  mobile_phone?: string;
  address?: string;
  address_complement?: string;
  postal_code?: string;
  city?: string;
  state?: string;
  country?: string;
  company_name?: string;
  job_title?: string;
  website?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  other_social?: string;
  birth_date?: string;
  gender?: string;
  source?: string;
  status: 'lead' | 'qualified' | 'customer' | 'churned';
  contact_owner?: string;
  notes?: string;
  custom_fields?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface ContactFormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  mobile_phone?: string;
  address?: string;
  address_complement?: string;
  postal_code?: string;
  city?: string;
  state?: string;
  country?: string;
  company_name?: string;
  job_title?: string;
  website?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  other_social?: string;
  birth_date?: string;
  gender?: string;
  source?: string;
  status: 'lead' | 'qualified' | 'customer' | 'churned';
  notes?: string;
}

export const defaultContactFormValues: ContactFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  mobile_phone: '',
  address: '',
  address_complement: '',
  postal_code: '',
  city: '',
  state: '',
  country: '',
  company_name: '',
  job_title: '',
  website: '',
  linkedin: '',
  facebook: '',
  twitter: '',
  instagram: '',
  other_social: '',
  birth_date: '',
  gender: '',
  source: '',
  status: 'lead',
  notes: ''
};
