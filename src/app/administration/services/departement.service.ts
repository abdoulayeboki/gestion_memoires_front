import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  constructor(private http: HttpClient) {
  }

  getDepartements(search:string=""):Observable<any> {
    return this.http.get(`${environment.apiUrl}/administration/departements?search=${search}`)
  }
}
