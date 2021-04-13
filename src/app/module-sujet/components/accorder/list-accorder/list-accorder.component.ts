import { Component, OnInit } from '@angular/core';
import { map, startWith, catchError } from 'rxjs/operators';
import { DataStateEnum } from 'src/app/core/models/app-data-state';
import { Observable, of } from 'rxjs';
import { SujetService } from '../../../services/sujet.service';
import { Sujet } from '../../../models/sujet';

@Component({
  selector: 'app-list-accorder',
  templateUrl: './list-accorder.component.html',
  styleUrls: ['./list-accorder.component.scss']
})
export class ListAccorderComponent implements OnInit {
  readonly DataStateEnum = DataStateEnum;
  accordes$: Observable<any> | undefined
  sujets$: Observable<any> | undefined
  personnelAccorder: any;
  data$: Observable<any> | undefined
  p: number = 1
  list_p :any[] | undefined
  constructor(
    private sujetService:SujetService,
  ) { }

  ngOnInit(): void {
    this.getSujets()
  }
  getSujets() {
    this.sujets$ = this.sujetService.getSujetAccorder().pipe(
      map((data) => {
        console.log(data)
        return ({ dataState: DataStateEnum.LOADED, data: data})
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((error) =>  of({dataState: DataStateEnum.ERROR,errorMessage:error.message }))
    )
  }

  
}
