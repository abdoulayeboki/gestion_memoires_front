import { Component, OnInit } from '@angular/core';
import { ModalPostulerComponent } from '../../postuler/modal-postuler/modal-postuler.component';
import {  DataStateEnum, AppDataState } from '../../../../core/models/app-data-state';
import { catchError, startWith, map, concatMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { SujetService } from '../../../services/sujet.service';
import { AuthServiceService } from '../../../../core/services/auth-service.service';
import { FormControl } from '@angular/forms';
import { Personnel } from '../../../../administration/models/personnel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-mes-sujets',
  templateUrl: './mes-sujets.component.html',
  styleUrls: ['./mes-sujets.component.scss']
})
export class MesSujetsComponent implements OnInit {
  sujets$: Observable<AppDataState<any>> | undefined
  readonly DataStateEnum = DataStateEnum;
  personnel?:Personnel
  p: number = 1;
  search = new FormControl('');
  constructor(
    private sujetService: SujetService,
    private authService: AuthServiceService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getSujets()
    
  }
  getSujets() {
    this.sujets$ = this.authService.userObservable.pipe(
      concatMap(user => this.authService.getUserById(user.id) )).pipe(
      concatMap( user => this.sujetService.getSujets('','',user.personnel?.id).pipe(
        map((data) => {
          return ({ dataState: DataStateEnum.LOADED, data: data})
        }),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError((error) =>  of({dataState: DataStateEnum.ERROR,errorMessage:error.message }))
      ))
    )
  }

  openDescription(description:string) {
        const modalRef = this.modalService.open(ModalPostulerComponent);
        modalRef.componentInstance.titre = "Description";
        modalRef.componentInstance.motivation = description;
  }
}
