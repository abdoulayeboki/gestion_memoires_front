import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Token } from '../models/token';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private currentUserSubject: BehaviorSubject<User>;
  userObservable:Observable<User>
  private refreshTimeout: any;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(this.getSession())
    this.userObservable = this.currentUserSubject.asObservable()
  }
    
  login(user: User): Observable<Token> {
    return this.http.post<Token>(`${environment.apiUrl}/api/token/`, user)
  }

  setSession(token: Token) {   
    this.logout()
    localStorage.setItem('access', token.access);
    localStorage.setItem("refresh", token.refresh);
    this.currentUserSubject.next(this.getSession())
    console.log(this.getSession())
    // this.startRefreshToken()
  }
  getSession() :User|any{
    let token_access = localStorage.getItem("access");
    if (token_access) 
      return jwt_decode(token_access);
  }
  get currentUser() : User{
    return this.currentUserSubject.value
  }

logout() {
    localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  this.currentUserSubject.next(this.getSession())
    this.stopRefreshToken()
}
  
get refreshToken():Observable<any> {
  let token_refresh = localStorage.getItem("refresh");
  return this.http.post<Token>(`${environment.apiUrl}/api/token/refresh/`, { "refresh": token_refresh }).pipe(
    map(token => {
      localStorage.setItem('access', token.access);
      this.currentUserSubject.next(this.getSession())
      this.startRefreshToken()
      console.log("token actualise")
    })
  )
}


startRefreshToken() {
  const dateExpiration = new Date (this.currentUser.exp*1000) // on multiplie par 1000 pour avoir la date actuelle au lieu de 1970
  const timeExpiration = dateExpiration.getTime() - Date.now() - (60*1000) // le temps avant 1mn d'expiration
  this.refreshTimeout = setTimeout(() => this.refreshToken.subscribe(),timeExpiration)
}
  
stopRefreshToken() {
  clearTimeout(this.refreshTimeout)
}

getUserById(id: number=0): Observable<User>{
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`) 
}
// public isLoggedIn() {
//     return moment().isBefore(this.getExpiration());
// }

// isLoggedOut() {
//     return !this.isLoggedIn();
// }

}
