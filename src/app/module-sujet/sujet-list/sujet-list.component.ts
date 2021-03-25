import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppDataState, DataStateEnum } from '../../core/models/app-data-state';
import { Sujet } from '../models/sujet';

@Component({
  selector: 'app-sujet-list',
  templateUrl: './sujet-list.component.html',
  styleUrls: ['./sujet-list.component.scss']
})
export class SujetListComponent implements OnInit {
  @Input() sujets$: Observable<AppDataState<Sujet[]>> | undefined;
  readonly DataStateEnum = DataStateEnum;
  
  constructor() { }

  ngOnInit(): void {
  }

}
