export interface Rate {
  rate: number;
  reduction?: number;
  currency: string;
  timestamp: number;
}

export interface Prestation {
  id: number;
  title: string;
  items: string[];
  description: string;
  rate: number;
  currency: string;
}

export interface PrestationFromCmd {
  id: number;
  title: string;
  items: string;
  description: string;
  rate: number;
  currency: string;
}