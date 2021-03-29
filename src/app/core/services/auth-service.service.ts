import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Token } from '../models/token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) {
  }
    
  login(user: User): Observable<Token> {
    return this.http.post<Token>(`${environment.apiUrl}/api/login/`, user)
  }
}
