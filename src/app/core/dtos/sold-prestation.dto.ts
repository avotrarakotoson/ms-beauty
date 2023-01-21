export interface CreateSoldPrestationItemDto {
  title: string;
  items: string[];
  rate: number;
  currency: string;
}

export interface CreateSoldPrestationDto {
  saleDate: number;
  amount: number;
  reduction: number;
  customerId: number;
  items: CreateSoldPrestationItemDto[];
}