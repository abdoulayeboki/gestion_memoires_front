import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../../services/classe.service';
import { FormControl } from '@angular/forms';
import { Filiere } from '../../models/filiere';
import { FiliereService } from '../../services/filiere.service';
import { DataStateEnum, AppDataState } from '../../../core/models/app-data-state';
import { Observable, of } from 'rxjs';
import { Classe } from '../../models/classe';
import { catchError, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {

  classes: Observable<AppDataState<any>> | undefined
  search = new FormControl('')
  filieres: any;
  p: number = 1;
  constructor(
    private classeService: ClasseService,
    private filiereService: FiliereService
  ) { }
  readonly DataStateEnum= DataStateEnum
  ngOnInit(): void {
    this.getClasses()
    this.getFilieres()
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
  getClasseByFiliere(idFiliere: string) {
    let id = parseInt(idFiliere)
    this.classes = this.classeService.getClasseByFiliere(id).pipe(
      map(data => {
           return ({dataState : DataStateEnum.LOADED, data: data})
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError (error =>of({dataState: DataStateEnum.ERROR,errorMessage:error.message }))
    )
  }
  getClasses() {
    this.classes = this.classeService.getClasses(this.search.value).pipe(
      map(data => {
           return ({dataState : DataStateEnum.LOADED, data: data})
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError (error =>of({dataState: DataStateEnum.ERROR,errorMessage:error.message }))
    )
  }

}
