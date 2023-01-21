export interface Agenda {
  id: number;
  date: string;
  comment: string;
  customerId: number;
  fullName: string;
  prestations: {
    id: number;
    title: string;
    items: string;
  }[];
}

export interface AgendaFromCmd {
  id: number;
  agenda_date: string;
  customer_id: number;
  full_name: string;
  comment: string;
  prestations: {
    id: number;
    agenda_id: number;
    title: string;
    items: string;
  }[];
}