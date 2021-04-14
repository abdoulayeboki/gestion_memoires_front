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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPostulerComponent } from '../../postuler/modal-postuler/modal-postuler.component';
import { FormControl } from '@angular/forms';

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
  etatSujets = [
    { code: "PROPOSE", nom: "PROPOSE" },
    { code: "ACCORDE", nom: "ACCORDE" },
    { code: "VALIDE", nom: "VALIDE" },
    { code: "TERMINE", nom: "TERMINE" },
    { code: "SOUTENU", nom: "SOUTENU" },
    { code: "DEPOSE", nom: "DEPOSE" },
  ];
  profils = [
    { code: "ETUDIANT", nom:"ETUDIANT" },
    { code: "ENSEIGNANT", nom: "ENSEIGNANT" },
    { code: "AUTRE", nom:"AUTRE" },
  ]
  search = new FormControl('');
  constructor(
    private sujetService: SujetService,
    private sujetObservableService: SujetObservableService,
    private router: Router,
    private authService: AuthServiceService,
    private modalService: NgbModal,
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
  getSujets(etatSujet:string ="",idPersonnel:number=0) {
    this.sujets$ = this.sujetService.getSujets(etatSujet,this.search.value,idPersonnel).pipe(
      map((data) => {
        console.log(data)
        return ({ dataState: DataStateEnum.LOADED, data: data})
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((error) =>  of({dataState: DataStateEnum.ERROR,errorMessage:error.message }))
    )
  }
  getSujetByProfil(profil: string) {
    this.sujets$ = this.sujetService.getSujetByProfil(profil).pipe(
      map((data) => {
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
  openDescription(description:string) {
        const modalRef = this.modalService.open(ModalPostulerComponent);
        modalRef.componentInstance.titre = "Description";
        modalRef.componentInstance.motivation = description;
  }
  // onUpdateSujet(id: any) {
  //     this.router.navigate(['sujet_edit', id]);
  // }
}
