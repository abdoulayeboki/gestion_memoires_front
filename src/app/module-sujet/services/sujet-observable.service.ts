import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EvenementSujet } from '../../core/models/app-data-state';

@Injectable({
  providedIn: 'root'
})
export class SujetObservableService {
  sujetSubject: Subject<EvenementSujet> = new Subject();
  sujetOservableSource = this.sujetSubject.asObservable()
  constructor() { }


  publish($event:EvenementSujet) {
    this.sujetSubject.next($event)
  }
}
