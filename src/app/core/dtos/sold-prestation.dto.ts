export interface CreateSoldPrestationDto {
  date: string;
  prestationId: number;
  userId: number;
  rate: number;
  currency: string;
  discount: number;
}