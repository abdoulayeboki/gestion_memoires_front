import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { Token } from '../models/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin:FormGroup;

  constructor(private fb:FormBuilder, 
               private authService: AuthServiceService, 
               private router: Router) {

      this.formLogin = this.fb.group({
          username: ['',Validators.required],
          password: ['',Validators.required]
      });
  }
  ngOnInit(): void {
  }

  login() {
      if (this.formLogin.valid) {
          this.authService.login(this.formLogin.value)
              .subscribe(
                  (token:Token ) => {
                  console.log("User is logged in");
                  console.log(token)
                      this.setSession(token)
                      this.router.navigateByUrl('etudiants');
                  }
              );
      }
    
  }

  private setSession(token: Token) {
    console.log(typeof token.access)
    localStorage.setItem('token', token.access);
    localStorage.setItem("refresh", token.refresh );
}          

logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
}

// public isLoggedIn() {
//     return moment().isBefore(this.getExpiration());
// }

// isLoggedOut() {
//     return !this.isLoggedIn();
// }

 

}
