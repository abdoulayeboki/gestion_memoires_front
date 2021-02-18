import { Classe } from './classe';
import { Promotion } from './promotion';
export interface Etudiant {
  id?: number;
  prenom: string;
  nom: string;
  ine: string;
  email: string;
  telephon: string;
  promotion: Promotion;
  classe: Classe
}
