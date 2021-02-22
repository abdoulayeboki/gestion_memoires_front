import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Etudiant } from '../models/etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private http: HttpClient) {
  }
  //  recuprer tous les etudiant
  getEtudiants(search: string=""):Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${environment.apiUrl}/administration/etudiants?search=${search}`)
  }
  
  // filtrer les etudiants
  getEtudiantByFilter(idPromotion: number, idClasse: number, niveau: string): Observable<Etudiant[]> {
    if (idPromotion != 0){
      if (idClasse != 0){
        if (niveau !== "") {
          return this.http.get<Etudiant[]>(`${environment.apiUrl}/administration/etudiants?promotion=${idPromotion}&classe=${idClasse}&classe__specialite__niveau=${niveau}`)          
        } else {
          return this.http.get<Etudiant[]>(`${environment.apiUrl}/administration/etudiants?promotion=${idPromotion}&classe=${idClasse}`)
         }
      } else {
        if (niveau !== "") {
          return this.http.get<Etudiant[]>(`${environment.apiUrl}/administration/etudiants?promotion=${idPromotion}&classe__specialite__niveau=${niveau}`)          
        } else {
          return this.http.get<Etudiant[]>(`${environment.apiUrl}/administration/etudiants?promotion=${idPromotion}`)
        }
      }
    } else {
      if (idClasse != 0){
        if (niveau !== "") {
          return this.http.get<Etudiant[]>(`${environment.apiUrl}/administration/etudiants?classe=${idClasse}&classe__specialite__niveau=${niveau}`)          
        } else {
          return this.http.get<Etudiant[]>(`${environment.apiUrl}/administration/etudiants?classe=${idClasse}`)
         }
      } else {
        if (niveau !== "") {
          return this.http.get<Etudiant[]>(`${environment.apiUrl}/administration/etudiants?classe__specialite__niveau=${niveau}`)          
        } else {
          return this.http.get<Etudiant[]>(`${environment.apiUrl}/administration/etudiants`)
        }
      }
    }
  }
}
