export interface CreditLog {
  reference?: string;
  id?: string;
  num_client?: number;
  month?: string;
  date?: string;
  completed_request?: string;
  days?: number;
  name?: string;
  product?: string;
  amount?: number;
  analist?: string;
  agency?: string;
  decision?: string;
  state_auraquantic?: string;
  contract?: string;
  [k: string]: any;
}
