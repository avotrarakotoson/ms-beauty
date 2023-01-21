export interface PrestationSold {
  id: number;
  saleDate: string;
  amount: number;
  reduction: number;
  customerId: number;
  fullName: string;
  items: {
    id: number;
    title: string
    items: string;
    rate: number;
    currency: string;
  }[];
}

export interface PrestationSoldFromCmd {
  id: number;
  sale_date: string;
  amount: number;
  reduction: number;
  customer_id: number;
  full_name: string;
  items: {
    currency: string;
    id: number;
    items: string;
    rate: number;
    sale_id: number;
    title: string
  }[];
}

