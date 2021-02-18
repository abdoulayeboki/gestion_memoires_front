import { Departement } from './departement';
export interface Filiere {
  id?: number;
  code: string;
  nom: string,
  departement: Departement;
}
