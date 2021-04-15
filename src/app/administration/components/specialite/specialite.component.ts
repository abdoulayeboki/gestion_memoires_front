import { Component, OnInit } from '@angular/core';
import { SpecialiteService } from '../../services/specialite.service';
import { FormControl } from '@angular/forms';
import { FiliereService } from '../../services/filiere.service';
import { DataStateEnum } from 'src/app/core/models/app-data-state';
import { Observable, of } from 'rxjs';
import { AppDataState } from '../../../core/models/app-data-state';
import { Specialite } from '../../models/specialite';
import { catchError, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrls: ['./specialite.component.scss']
})
export class SpecialiteComponent implements OnInit {

  specialites: Observable<AppDataState<any>> | undefined
  filieres: any
  p: number = 1;
  readonly DataStateEnum=DataStateEnum
  search= new FormControl('')
  constructor(
    private specialiteService: SpecialiteService,
    private filiereService: FiliereService,
  ) { }

  ngOnInit(): void {
    this.getSpecialites()
    this.getFilieres()
  }
  getSpecialites() {
    this.specialites = this.specialiteService.getSpecialites(this.search.value).pipe(
      map(data => {
           return ({dataState : DataStateEnum.LOADED, data: data})
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(error =>of({dataState: DataStateEnum.ERROR,errorMessage:error.message }))
    )
  }
  getFilieres() {
    this.filiereService.getFilieres(this.search.value).subscribe(
      (data) => {
        console.log(data)
        this.filieres =data
      },
      (error) => console.log(error)
    )
  }
  getSpecialiteByFiliere(idFiliere: string) {
    let id = parseInt(idFiliere)
    this.specialites = this.specialiteService.getSpecialiteByFiliere(id).pipe(
      map(data => {
           return ({dataState : DataStateEnum.LOADED, data: data})
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(error =>of({dataState: DataStateEnum.ERROR,errorMessage:error.message }))
    )
  }
}
