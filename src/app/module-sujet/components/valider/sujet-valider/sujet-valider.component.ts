import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppDataState, DataStateEnum } from '../../../../core/models/app-data-state';
import { Personnel } from '../../../../administration/models/personnel';
import { FormControl } from '@angular/forms';
import { SujetService } from '../../../services/sujet.service';
import { AuthServiceService } from '../../../../core/services/auth-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { concatMap, map, startWith, catchError } from 'rxjs/operators';
import { ModalPostulerComponent } from '../../postuler/modal-postuler/modal-postuler.component';

@Component({
  selector: 'app-sujet-valider',
  templateUrl: './sujet-valider.component.html',
  styleUrls: ['./sujet-valider.component.scss']
})
export class SujetValiderComponent implements OnInit {

  sujets$: Observable<AppDataState<any>> | undefined
  readonly DataStateEnum = DataStateEnum;
  personnel?:Personnel;
  p: number = 1;
  search = new FormControl('');
  constructor(
    private sujetService: SujetService,
    private authService: AuthServiceService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getSujetValider()
  }
  getSujetValider() {
    this.sujets$ = this.sujetService.getSujetValider(this.search.value).pipe(
      map((data) => {
        console.log(data)
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((error) => of({ dataState: DataStateEnum.ERROR, errorMessage: error.message }))
    );
  }

  openDescription(description:string) {
        const modalRef = this.modalService.open(ModalPostulerComponent);
        modalRef.componentInstance.titre = "Description";
        modalRef.componentInstance.motivation = description;
  }
}
