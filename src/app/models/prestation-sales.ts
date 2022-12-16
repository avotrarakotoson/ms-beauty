export interface PrestationSold {
  id: number;
  date: string;
  prestation: string;
  fullName: string;
  items: string[];
  rate: number;
  currency: string;
  discount: number;
}