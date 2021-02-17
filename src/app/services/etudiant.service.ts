import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Etudiant } from '../modeles/etudiant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  constructor(private http: HttpClient) {
  }

  getEtudiant():Observable<any> {
    return this.http.get(`${environment.apiUrl}/administration/etudiants`)
  }
}
