import { Prestation } from "./prestation";
import { Customer } from "./customer";

export interface Event {
  id: number;
  title: string;
  prestations: Prestation[];
  user: Customer;
  date: string; // Date form accepted
}