import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sujet } from '../models/sujet';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { User } from '../../core/models/user';
import { concatMap, catchError, map } from 'rxjs/operators';
import { Personnel } from '../../administration/models/personnel';

@Injectable({
  providedIn: 'root'
})
export class SujetService {
  constructor(private http: HttpClient) {
  }

  getSujets(etatSujet: string = "", search: string = "", personnel: number = 0): Observable<Sujet[]> {
    if (personnel != 0) {
      if (etatSujet != "") 
        return this.http.get<Sujet[]>(`${environment.apiUrl}/sujets?personnel=${personnel}&etatSujet=${etatSujet}`)
      else return this.http.get<Sujet[]>(`${environment.apiUrl}/sujets?personnel=${personnel}`)
    } else {
      if (etatSujet != "") 
        return this.http.get<Sujet[]>(`${environment.apiUrl}/sujets?etatSujet=${etatSujet}`)
      else return this.http.get<Sujet[]>(`${environment.apiUrl}/sujets?search=${search}`)
    }
    
  }

  getSujetByProfil(profil: string): Observable<Sujet[]> {
    return this.http.get<Sujet[]>(`${environment.apiUrl}/sujets`).pipe(
      map((sujets:Sujet[]) =>sujets.filter((sujet:Sujet) => sujet.personnel.profil==profil) )
    )
  }

  getSujetAccorder(): Observable<Sujet[]> {
    return this.http.get<Sujet[]>(`${environment.apiUrl}/sujets`).pipe(
      map(
        (sujets: Sujet[]) => sujets.filter((sujet: Sujet) => sujet.etatSujet == "ACCORDE") 
      )
    )
  }
  getSujetValider(search: string = ""): Observable<Sujet[]> {
    return this.http.get<Sujet[]>(`${environment.apiUrl}/sujets?search=${search}`).pipe(
      map(
        (sujets: Sujet[]) => sujets.filter((sujet: Sujet) => sujet.etatSujet == "VALIDER") 
      )
    )
  }
  getSujet(id: number): Observable<Sujet> {
    return this.http.get<Sujet>(`${environment.apiUrl}/sujets/${id}/`)
  }
  postSujets(sujet: Sujet): Observable<Sujet>{
    return this.http.post<Sujet>(`${environment.apiUrl}/sujets`, sujet);
  }

  updateSujet(sujet: Sujet): Observable<Sujet> {
    return this.http.put<Sujet>(`${environment.apiUrl}/sujets/${sujet.id}/`,sujet)
  }
  getPersonnelByUser(id?: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/administration/personnels/?user=${id}`)
  }

  deleteSujet(sujet?: Sujet): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/sujets/${sujet?.id}`)
  }
}
