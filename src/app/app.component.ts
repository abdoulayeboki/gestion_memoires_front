import { Component } from '@angular/core';
import { AuthServiceService } from './core/services/auth-service.service';
import { User } from './core/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gestion-memoires-front';
  user?: User;
  personnel?: any;
  constructor(
    private  authService: AuthServiceService
  ) {
    this.authService.userObservable.subscribe(user => this.user = user)
    // this.authService.getUserById(this.user?.id).subscribe(user => this.personnel = user)
  }
}

