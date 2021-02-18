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

  getClasses():Observable<any> {
    return this.http.get(`${environment.apiUrl}/administration/classes`)
  }
}
