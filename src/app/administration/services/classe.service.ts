import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  constructor(private http: HttpClient) {
  }

  getClasses(search: string=""): Observable<any> {
    return this.http.get(`${environment.apiUrl}/administration/classes?search=${search}`)
  }
  getClasseByFiliere(idFiliere: number): Observable<any> {
    if(idFiliere)
      return this.http.get(`${environment.apiUrl}/administration/classes?specialite__filiere=${idFiliere}`)
    else
      return this.http.get(`${environment.apiUrl}/administration/classes`)
  }
}
