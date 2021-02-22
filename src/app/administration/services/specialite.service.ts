import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Specialite } from '../models/specialite';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  constructor(private http: HttpClient) {
  }

  getSpecialites(search:string=""):Observable<Specialite[]> {
    return this.http.get<Specialite[]>(`${environment.apiUrl}/administration/specialites?search=${search}`)
  }

  getSpecialiteByFiliere(idFiliere: number): Observable<any> {
    if(idFiliere)
      return this.http.get<Specialite[]>(`${environment.apiUrl}/administration/specialites?filiere=${idFiliere}`)
    else
      return this.http.get<Specialite[]>(`${environment.apiUrl}/administration/specialites`)
  }
}
