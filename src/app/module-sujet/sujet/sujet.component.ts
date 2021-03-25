import { Component, OnInit } from '@angular/core';
import { SujetService } from '../services/sujet.service';
import { Observable, of } from 'rxjs';
import { AppDataState, DataStateEnum, EvenementSujet, TypeEvenementSujet } from '../../core/models/app-data-state';
import { Sujet } from '../models/sujet';
import { map, startWith, catchError } from 'rxjs/operators';
import { SujetObservableService } from '../services/sujet-observable.service';

@Component({
  selector: 'app-sujet',
  templateUrl: './sujet.component.html',
  styleUrls: ['./sujet.component.scss']
})
export class SujetComponent implements OnInit {
  sujets$: Observable<AppDataState<Sujet[]>> | undefined
  readonly DataStateEnum = DataStateEnum; 
  constructor(
    private sujetService: SujetService,
    private sujetObservableService: SujetObservableService
  ) { }

  ngOnInit(): void {
    this.getSujets()
    this.sujetObservableService.sujetOservableSource.subscribe(
      ($event: EvenementSujet) => {this.onActionEvent($event)}
    )
  }
  getSujets(etatSujet?:string) {
    this.sujets$ = this.sujetService.getSujets(etatSujet).pipe(
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
}
