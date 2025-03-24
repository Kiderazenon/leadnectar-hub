
export interface Company {
  id: string;
  user_id: string;
  team_id?: string;
  name: string;
  industry?: string;
  logo_url?: string;
  description?: string;
  founding_year?: number;
  address?: string;
  postal_code?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  employee_count?: number;
  annual_revenue?: number;
  legal_status?: string;
  legal_id?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  other_social?: Record<string, string>;
  relationship_type?: string;
  source?: string;
  account_owner?: string;
  notes?: string;
  custom_fields?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface CompanyFormValues {
  name: string;
  industry?: string;
  logo_url?: string;
  description?: string;
  founding_year?: number;
  address?: string;
  postal_code?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  employee_count?: number;
  annual_revenue?: number;
  legal_status?: string;
  legal_id?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  relationship_type?: string;
  source?: string;
  notes?: string;
}

export const defaultCompanyFormValues: CompanyFormValues = {
  name: '',
  industry: '',
  description: '',
  founding_year: undefined,
  address: '',
  postal_code: '',
  city: '',
  state: '',
  country: '',
  phone: '',
  email: '',
  website: '',
  employee_count: undefined,
  annual_revenue: undefined,
  legal_status: '',
  legal_id: '',
  linkedin: '',
  facebook: '',
  twitter: '',
  instagram: '',
  relationship_type: '',
  source: '',
  notes: ''
};
