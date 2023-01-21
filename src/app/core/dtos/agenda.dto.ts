export interface CreateAgendaItemDto {
  title: string;
  items: string[];
}

export interface CreateAgendaDto {
  agendaDate: string;
  comment: string;
  customerId: number;
  prestations: CreateAgendaItemDto[];
}