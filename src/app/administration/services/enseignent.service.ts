import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnseignentService {

  constructor(private http: HttpClient) {
  }

  getEnseignents(search:string=""):Observable<any> {
    return this.http.get(`${environment.apiUrl}/administration/enseignents?search=${search}`)
  }
  
  getEnseignentByDepartement(idDepartement: number): Observable<any> {
    if(idDepartement)
      return this.http.get(`${environment.apiUrl}/administration/enseignents?departement=${idDepartement}`)
    else
      return this.http.get(`${environment.apiUrl}/administration/enseignents`)
  }

}
