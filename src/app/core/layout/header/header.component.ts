import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthServiceService, private router:Router) { }

  ngOnInit(): void {
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(["login/"])
 }
}
