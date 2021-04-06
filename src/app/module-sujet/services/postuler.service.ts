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

  postAccorderSujets(idSujet:number|any,idPersonnel: number): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/sujet_accorder`, {"sujet":idSujet,"personnel":idPersonnel});
  }
  getPostulerBySujetAndPersonnel(idSujet:number|any,idPersonnel: number):Observable<Postuler[]> {
    return this.http.get<Postuler[]>(`${environment.apiUrl}/sujet_postuler?sujet=${idSujet}&personnel=${idPersonnel}`);
  }
  getAccorderBySujetAndPersonnel(idSujet:number|any,idPersonnel: number):Observable<Postuler[]> {
    return this.http.get<Postuler[]>(`${environment.apiUrl}/sujet_accorder?sujet=${idSujet}&personnel=${idPersonnel}`);
  }

  deleteAccorderSujets(sujetAccorder: any){
    return this.http.delete(`${environment.apiUrl}/sujet_accorder/${sujetAccorder.id}/`);
  }
}
