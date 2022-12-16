export interface CreateUserDto {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  email: string;
  primaryPhone: string;
}

export interface UpdateUserDto extends CreateUserDto{
  id: number;
}