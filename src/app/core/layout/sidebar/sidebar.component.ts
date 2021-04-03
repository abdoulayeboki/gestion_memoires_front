import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthServiceService } from '../../services/auth-service.service';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  personnel?: any;
  constructor(private authService: AuthServiceService) {
    // recuperons le personnel actuellement connecte
    this.authService.userObservable.pipe(
      concatMap(user => this.authService.getUserById(user.id) )
    ).subscribe(user => this.personnel = user.personnel)
  }

  ngOnInit(): void {
  }

}
