import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Classe } from '../models/classe';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  constructor(private http: HttpClient) {
  }

  getClasses(search: string=""): Observable<Classe[]> {
    return this.http.get<Classe[]>(`${environment.apiUrl}/administration/classes?search=${search}`)
  }
  getClasseByFiliere(idFiliere: number): Observable<Classe[]> {
    if(idFiliere)
      return this.http.get<Classe[]>(`${environment.apiUrl}/administration/classes?specialite__filiere=${idFiliere}`)
    else
      return this.http.get<Classe[]>(`${environment.apiUrl}/administration/classes`)
  }
}
