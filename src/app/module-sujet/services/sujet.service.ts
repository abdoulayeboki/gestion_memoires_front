import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sujet } from '../models/sujet';

@Injectable({
  providedIn: 'root'
})
export class SujetService {

  constructor(private http: HttpClient) {
  }

  getSujets(etatSujet: string=""): Observable<Sujet[]> {
    return this.http.get<Sujet[]>(`${environment.apiUrl}/sujets?etatSujet=${etatSujet}`)
  }
}
