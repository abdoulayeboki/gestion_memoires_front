import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private http: HttpClient) {
  }

  getEtudiants(search: string=""):Observable<any> {
    return this.http.get(`${environment.apiUrl}/administration/etudiants?search=${search}`)
  }
  getEtudiantByFilter(idPromotion: number, idClasse: number, niveau: string): Observable<any> {
    if (idPromotion != 0){
      if (idClasse != 0){
        if (niveau !== "") {
          return this.http.get(`${environment.apiUrl}/administration/etudiants?promotion=${idPromotion}&classe=${idClasse}&classe__specialite__niveau=${niveau}`)          
        } else {
          return this.http.get(`${environment.apiUrl}/administration/etudiants?promotion=${idPromotion}&classe=${idClasse}`)
         }
      } else {
        if (niveau !== "") {
          return this.http.get(`${environment.apiUrl}/administration/etudiants?promotion=${idPromotion}&classe__specialite__niveau=${niveau}`)          
        } else {
          return this.http.get(`${environment.apiUrl}/administration/etudiants?promotion=${idPromotion}`)
        }
      }
    } else {
      if (idClasse != 0){
        if (niveau !== "") {
          return this.http.get(`${environment.apiUrl}/administration/etudiants?classe=${idClasse}&classe__specialite__niveau=${niveau}`)          
        } else {
          return this.http.get(`${environment.apiUrl}/administration/etudiants?classe=${idClasse}`)
         }
      } else {
        if (niveau !== "") {
          return this.http.get(`${environment.apiUrl}/administration/etudiants?classe__specialite__niveau=${niveau}`)          
        } else {
          return this.http.get(`${environment.apiUrl}/administration/etudiants`)
        }
      }
    }
  }
}
