import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Enseignent } from '../models/enseignent';

@Injectable({
  providedIn: 'root'
})
export class EnseignentService {

  constructor(private http: HttpClient) {
  }

  getEnseignents(search:string=""):Observable<Enseignent[]> {
    return this.http.get<Enseignent[]>(`${environment.apiUrl}/administration/enseignents?search=${search}`)
  }
  
  getEnseignentByDepartement(idDepartement: number): Observable<Enseignent[]> {
    if(idDepartement)
      return this.http.get<Enseignent[]>(`${environment.apiUrl}/administration/enseignents?departement=${idDepartement}`)
    else
      return this.http.get<Enseignent[]>(`${environment.apiUrl}/administration/enseignents`)
  }

}
