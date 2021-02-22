import { Component, OnInit } from '@angular/core';
import { FiliereService } from '../../services/filiere.service';
import { FormControl } from '@angular/forms';
import { DepartementService } from '../../services/departement.service';
import { catchError, map, startWith } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { DataStateEnum } from 'src/app/core/models/app-data-state';
import { AppDataState } from '../../../core/models/app-data-state';
import { Filiere } from '../../models/filiere';

@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.scss']
})
export class FiliereComponent implements OnInit {

  filieres: Observable<AppDataState<Filiere[]>> | undefined
  departements: any;
  search = new FormControl('')
  readonly DataStateEnum = DataStateEnum;
  constructor(
    private filiereService: FiliereService,
    private departementService: DepartementService,
  ) { }

  ngOnInit(): void {
    this.getFilieres()
    this.getDepartements()
  }
  getDepartements() {
    this.departementService.getDepartements().subscribe(
      (data) => {
        console.log(data)
        this.departements =data
      },
      (error) => console.log(error)
   )
  }
  getFiliereByDepartement(idDepartement: string) {
    let id = parseInt(idDepartement)
    this.filieres = this.filiereService.getFiliereByDepartement(id).pipe(
      map(data => {
           return ({dataState : DataStateEnum.LOADED, data: data})
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(error =>of({dataState: DataStateEnum.ERROR,errorMessage:error.message }))
    )
  }
  getFilieres() {
     this.filieres = this.filiereService.getFilieres(this.search.value).pipe(
      map(data => {
           return ({dataState : DataStateEnum.LOADED, data: data})
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(error =>of({dataState: DataStateEnum.ERROR,errorMessage:error.message }))
    )
  }


}
