import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sujet } from '../models/sujet';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { User } from '../../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class SujetService {
  currentUser: User;
  user?: User;
  constructor(private http: HttpClient, private authService: AuthServiceService) {
    this.currentUser = authService.currentUser;
     this.authService.userObservable.subscribe(user =>this.user=user)
  }

  getSujets(etatSujet: string=""): Observable<Sujet[]> {
    return this.http.get<Sujet[]>(`${environment.apiUrl}/sujets?etatSujet=${etatSujet}`)
  }
  getSujet(id: number): Observable<Sujet> {
    return this.http.get<Sujet>(`${environment.apiUrl}/sujets/${id}`)
  }
  postSujets(sujet: Sujet): Observable<Sujet> {
    sujet.owner = this.currentUser.user_id
    // sujet.owner = this.user?.user_id
    console.log(sujet.owner)
    return this.http.post<Sujet>(`${environment.apiUrl}/sujets`,sujet)
  }
  updateSujet(sujet: Sujet): Observable<Sujet> {
    return this.http.put<Sujet>(`${environment.apiUrl}/sujets/${sujet.id}`,sujet)
  }

  deleteSujet(sujet?: Sujet): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/sujets/${sujet?.id}`)
  }
}
