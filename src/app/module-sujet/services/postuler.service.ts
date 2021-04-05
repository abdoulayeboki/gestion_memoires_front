import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Postuler } from '../models/postuler';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostulerService {

  constructor(
    private http: HttpClient,
  ) { }

  postPostulerSujets(postuler: Postuler): Observable<Postuler>{
    return this.http.post<Postuler>(`${environment.apiUrl}/sujet_postuler`, postuler);
  }
}
