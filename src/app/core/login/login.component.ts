import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { Token } from '../models/token';
import jwt_decode from "jwt-decode";

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
                      this.authService.setSession(token)
                      this.authService.startRefreshToken()
                      this.router.navigateByUrl('');
                  }
              );
      }
    
  }


 

}
