import { Filiere } from './filiere';
export interface Specialite {
  id?: number;
  code: string;
  nom: string;
  niveau: string;
  filiere: Filiere;
}
