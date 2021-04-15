import { Component, OnInit } from '@angular/core';
import { DepartementService } from '../../services/departement.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Departement } from '../../models/departement';
import { DataStateEnum } from 'src/app/core/models/app-data-state';
import { catchError, map, startWith } from 'rxjs/operators';
import { AppDataState } from '../../../core/models/app-data-state';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {
  departements: Observable<AppDataState<any>>| null | undefined
  search = new FormControl('');
  readonly DataStateEnum = DataStateEnum;
  p: number = 1;
  constructor(private departementService: DepartementService) { }

  ngOnInit(): void {
    this.getDepartements()
  }

  getDepartements() {
    this.departements = this.departementService.getDepartements().
      pipe(
        map(data => {
          return ({ dataState: DataStateEnum.LOADED, data: data })
        }),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError( (error) =>of( {dataState: DataStateEnum.ERROR, errorMessage:error.message}))
    ) 
    ; 
  }

}
