export interface CreateCustomerDto {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  email: string;
  primaryPhone: string;
}

export interface UpdateCustomerDto extends CreateCustomerDto{
  id: number;
}