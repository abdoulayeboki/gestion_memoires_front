import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Departement } from '../models/departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  constructor(private http: HttpClient) {
  }

  getDepartements(search:string=""):Observable<Departement[]> {
    return this.http.get<Departement[]>(`${environment.apiUrl}/administration/departements?search=${search}`)
  }
}
