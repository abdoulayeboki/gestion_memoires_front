import { Component, OnInit } from '@angular/core';
import { SujetService } from '../../services/sujet.service';
import { Observable, of } from 'rxjs';
import { AppDataState, DataStateEnum, EvenementSujet, TypeEvenementSujet } from '../../../core/models/app-data-state';
import { Sujet } from '../../models/sujet';
import { map, startWith, catchError } from 'rxjs/operators';
import { SujetObservableService } from '../../services/sujet-observable.service';

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

  }
 

  onActionEvent($event: EvenementSujet) {
    switch ($event.type) {
      // case TypeEvenementSujet.PROPOSE: this.getSujets("PROPOSE"); break;
    }
  }
}
