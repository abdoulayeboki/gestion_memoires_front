import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppDataState, DataStateEnum, TypeEvenementSujet, EvenementSujet } from '../../../../core/models/app-data-state';
import { Sujet } from '../../../models/sujet';
import { catchError, startWith, map, concatMap } from 'rxjs/operators';
import { SujetObservableService } from '../../../services/sujet-observable.service';
import { SujetService } from '../../../services/sujet.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../../core/services/auth-service.service';
import { User } from '../../../../core/models/user';
import { Personnel } from '../../../../administration/models/personnel';

@Component({
  selector: 'app-sujet-list',
  templateUrl: './sujet-list.component.html',
  styleUrls: ['./sujet-list.component.scss']
})
export class SujetListComponent implements OnInit {
  sujets$: Observable<AppDataState<any>> | undefined
  readonly DataStateEnum = DataStateEnum;
  personnel?:Personnel
   p: number = 1;
  constructor(
    private sujetService: SujetService,
    private sujetObservableService: SujetObservableService,
    private router: Router,
    private authService:AuthServiceService
  ) { }

  ngOnInit(): void {
    this.getSujets()
    this.sujetObservableService.sujetOservableSource.subscribe(
      ($event: EvenementSujet) => {this.onActionEvent($event)}
    )
    // recuperons le personnel actuellement connecte
    this.authService.userObservable.pipe(
      concatMap(user => this.authService.getUserById(user.id) )
    ).subscribe(user => { this.personnel = user.personnel; console.log(user) })
    
  }
  
  // owner permet de verifier si la personne est proprietaire du sujet pour pouvoir modifie ou non
  owner(sujet:Sujet): Boolean{
    if (this.personnel?.id==sujet.personnel?.id && sujet.etatSujet=="PROPOSE")
      return true
    else return false
  }
  getSujets(etatSujet:string ="") {
    this.sujets$ = this.sujetService.getSujets(etatSujet).pipe(
      map((data) => {
        console.log(data)
        return ({ dataState: DataStateEnum.LOADED, data: data})
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((error) =>  of({dataState: DataStateEnum.ERROR,errorMessage:error.message }))
    )
  }

  onActionEvent($event: EvenementSujet) {
    switch ($event.type) {
      case TypeEvenementSujet.PROPOSE: this.getSujets("PROPOSE"); break;
      case TypeEvenementSujet.VALIDE: this.getSujets("VALIDE"); break;
      case TypeEvenementSujet.ACCORDE: this.getSujets("ACCORDE"); break;
      case TypeEvenementSujet.SOUTENU: this.getSujets("SOUTENU"); break;
      case TypeEvenementSujet.TERMINE: this.getSujets("TERMINE"); break;
      case TypeEvenementSujet.DEPOSE: this.getSujets("DEPOSE"); break;
      case TypeEvenementSujet.ALL: this.getSujets(); break;
    }
  }
 
  // onUpdateSujet(id: any) {
  //     this.router.navigate(['sujet_edit', id]);
  // }
}
