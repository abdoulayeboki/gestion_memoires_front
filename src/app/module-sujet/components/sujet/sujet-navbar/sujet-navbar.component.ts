import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TypeEvenementSujet, EvenementSujet } from '../../../../core/models/app-data-state';
import { SujetObservableService } from '../../../services/sujet-observable.service';
import { AuthServiceService } from '../../../../core/services/auth-service.service';
import { concatMap } from 'rxjs/operators';
import { Personnel } from 'src/app/administration/models/personnel';

@Component({
  selector: 'app-sujet-navbar',
  templateUrl: './sujet-navbar.component.html',
  styleUrls: ['./sujet-navbar.component.scss']
})
export class SujetNavbarComponent implements OnInit {
  personnel: Personnel | undefined
  admin:boolean =false
  constructor(
    private sujetObservableService: SujetObservableService,
    private authService : AuthServiceService
  ) {
     // recuperons le personnel actuellement connecte
     this.authService.userObservable.pipe(
      concatMap(user => this.authService.getUserById(user.id) )
     ).subscribe(user => {
       this.personnel = user.personnel
       if (this.personnel?.profil == "AUTRE")
         this.admin = true
     })
  }

  ngOnInit(): void {
  }
  onGetAll() {this.sujetObservableService.publish({type:TypeEvenementSujet.ALL})}
  onGetSujetValide() {this.sujetObservableService.publish({type:TypeEvenementSujet.VALIDE}) }
  onGetSujetTermine() {this.sujetObservableService.publish({type:TypeEvenementSujet.TERMINE})}
  onGetSujetSoutenu() {this.sujetObservableService.publish({type:TypeEvenementSujet.SOUTENU})}
  onGetSujetDepose() { this.sujetObservableService.publish({type:TypeEvenementSujet.DEPOSE})}
  onGetSujetPropose() {this.sujetObservableService.publish({type:TypeEvenementSujet.PROPOSE})}
  onGetSujetAccorde(){this.sujetObservableService.publish({type:TypeEvenementSujet.ACCORDE})}
}
