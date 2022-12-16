export interface CreatePrestationDto {
  title: string;
  description: string;
  items: string[];
  rate: number;
  currency: string;
}

export interface UpdatePrestationDto extends CreatePrestationDto {
  id: number;
}