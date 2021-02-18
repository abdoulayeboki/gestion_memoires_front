import { Departement } from './departement';
export interface Enseignent {
  id?: number;
  prenom: string;
  nom: string;
  cni: string;
  email: string;
  telephon: string;
  grade: string;
  specialite: string;
  departement: Departement;
}
