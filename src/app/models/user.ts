export interface User {
  id: number;
  firstName: string;
  lastName: string;
  fullName?: string;
  gender: string;
  dob: string; // Form MM/DD/YYYY
  email: string;
  address: string;
  primaryPhone: string;
  secondaryPhone: string;
}