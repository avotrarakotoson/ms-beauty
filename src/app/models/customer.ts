export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  fullName?: string;
  gender: string;
  dob: string; // Form MM/DD/YYYY
  email: string;
  address: string;
  primaryPhone: string;
  registryDate?: string;
}

export interface CustomerFromCmd {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  dob: string; // Form MM/DD/YYYY
  email: string;
  address: string;
  primary_phone: string;
  registry_date: string;
}
