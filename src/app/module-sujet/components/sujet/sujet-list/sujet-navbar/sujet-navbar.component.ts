import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TypeEvenementSujet, EvenementSujet } from '../../../../../core/models/app-data-state';
import { SujetObservableService } from '../../../../services/sujet-observable.service';

@Component({
  selector: 'app-sujet-navbar',
  templateUrl: './sujet-navbar.component.html',
  styleUrls: ['./sujet-navbar.component.scss']
})
export class SujetNavbarComponent implements OnInit {
// @Output() sujetEventEmitter: EventEmitter<EvenementSujet> = new EventEmitter();
  constructor(
    private sujetObservableService: SujetObservableService,
  ) { }

  ngOnInit(): void {
  }
  onGetAll() {this.sujetObservableService.publish({type:TypeEvenementSujet.ALL})}
  onGetSujetValide() {this.sujetObservableService.publish({type:TypeEvenementSujet.VALIDE}) }
  onGetSujetTermine() {this.sujetObservableService.publish({type:TypeEvenementSujet.TERMINE}) }
  onGetSujetSoutenu() {this.sujetObservableService.publish({type:TypeEvenementSujet.SOUTENU}) }
  onGetSujetDepose() { this.sujetObservableService.publish({type:TypeEvenementSujet.DEPOSE})}
  onGetSujetPropose() {this.sujetObservableService.publish({type:TypeEvenementSujet.PROPOSE}) }
  onGetSujetAccorde(){this.sujetObservableService.publish({type:TypeEvenementSujet.ACCORDE})}
}
