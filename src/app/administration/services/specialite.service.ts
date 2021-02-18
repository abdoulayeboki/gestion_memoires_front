import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  constructor(private http: HttpClient) {
  }

  getSpecialites(search:string=""):Observable<any> {
    return this.http.get(`${environment.apiUrl}/administration/specialites?search=${search}`)
  }

  getSpecialiteByFiliere(idFiliere: number): Observable<any> {
    if(idFiliere)
      return this.http.get(`${environment.apiUrl}/administration/specialites?filiere=${idFiliere}`)
    else
      return this.http.get(`${environment.apiUrl}/administration/specialites`)
  }
}
