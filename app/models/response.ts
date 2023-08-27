import { Bukalapak } from "./bukalapak";

export interface ResponseProps {
  status: string;
  total: number;
  data: Bukalapak[];
}
