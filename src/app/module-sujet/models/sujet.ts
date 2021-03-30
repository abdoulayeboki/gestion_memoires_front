export interface Sujet {
  id?: number;
  titre: string;
  description: string;
  owner?: number;
  createdDate?: Date;
  etatSujet?: string;
}
