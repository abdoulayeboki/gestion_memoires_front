export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR,
}
export interface AppDataState<T> {
  dataState?: DataStateEnum;
  data?: T;
  errorMessage?: string;
}

export enum TypeEvenementSujet {
  PROPOSE ="Sujet propose",
  VALIDE ="Sujet valide",
  ACCORDE = "Sujet accorde",
  TERMINE = "Sujet termine",
  SOUTENU = "Sjet soutenu",
  DEPOSE = "sujet depose",
  ALL="tous les sujet"
}

export interface EvenementSujet{
  type: TypeEvenementSujet;
  payload?: any;
}