import { Component, OnInit } from '@angular/core';
import { EnseignentService } from '../../services/enseignent.service';
import { FormControl } from '@angular/forms';
import { DepartementService } from '../../services/departement.service';
import { DataStateEnum } from 'src/app/core/models/app-data-state';
import { Observable, of } from 'rxjs';
import { AppDataState } from '../../../core/models/app-data-state';
import { Enseignent } from '../../models/enseignent';
import { catchError, map, mapTo, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-enseignent',
  templateUrl: './enseignent.component.html',
  styleUrls: ['./enseignent.component.scss']
})
export class EnseignentComponent implements OnInit {
  enseignents: Observable<AppDataState<Enseignent[]>> |  undefined
  search = new FormControl('');
  departements: any
  readonly DataStateEnum = DataStateEnum;
  constructor(
    private enseignentService: EnseignentService,
    private departementService: DepartementService,
  ) { }
 
  ngOnInit(): void {
    this.getEnseignents()
    this.getDepartements()
  }
  getDepartements() {
    this.departementService.getDepartements(this.search.value).subscribe(
      (data) => {
        console.log(data)
        this.departements =data
      },
      (error) => console.log(error)
   )
  }
  getEnseignentByDepartement(codeDepartement: string) {
    let code = parseInt(codeDepartement)
    console.log(code)
    this.enseignents = this.enseignentService.getEnseignentByDepartement(code).pipe(
      map(data => {
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError( (error) =>of( {dataState: DataStateEnum.ERROR, errorMessage:error.message}))
    ) 
  }
  getEnseignents() {
    this.enseignents = this.enseignentService.getEnseignents(this.search.value).pipe(
      map(data => {
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError( (error) =>of( {dataState: DataStateEnum.ERROR, errorMessage:error.message}))
    )    
  }
  
}
