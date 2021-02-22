import { Specialite } from './specialite';
export interface Classe {
  id?: number;
  code: string;
  nom: string;
  specialite: Specialite;
  anneeScolaire: string;
}
