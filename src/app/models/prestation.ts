export interface Prestation {
  id: number;
  title: string;
  items: string[];
  description: string;
  rates: {
    rate: number;
    currency: string;
    timestamp: number;
  }[];
}