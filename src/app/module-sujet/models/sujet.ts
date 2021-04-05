import { Personnel } from "src/app/administration/models/personnel";

export interface Sujet {
  id?: number;
  titre: string;
  description: string;
  personnel?: Personnel;
  createdDate?: Date;
  etatSujet?: string;
  personnelPostuler?: any;
  personnelAccorder?: any;
}
