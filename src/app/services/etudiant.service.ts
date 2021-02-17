import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Etudiant } from '../modeles/etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  constructor(private http: HttpClient) {
  }

  getEtudiant() {
    return this.http.get(`${environment.apiUrl}/administration/etudiants`)
  }
}
