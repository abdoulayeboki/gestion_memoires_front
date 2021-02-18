import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FiliereService {

  constructor(private http: HttpClient) {
  }

  getFilieres(search:string=""):Observable<any> {
    return this.http.get(`${environment.apiUrl}/administration/filieres?search=${search}`)
  }
  getFiliereByDepartement(idDepartement: number): Observable<any> {
    if(idDepartement)
      return this.http.get(`${environment.apiUrl}/administration/filieres?departement=${idDepartement}`)
    else
      return this.http.get(`${environment.apiUrl}/administration/filieres`)
  }
}
