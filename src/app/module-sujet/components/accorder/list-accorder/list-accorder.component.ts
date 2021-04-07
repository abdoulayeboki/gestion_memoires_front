import { Component, OnInit } from '@angular/core';
import { map, startWith, catchError, concatMap } from 'rxjs/operators';
import { DataStateEnum } from 'src/app/core/models/app-data-state';
import { PostulerService } from '../../../services/postuler.service';
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
  p: number =1
  constructor(
    private postulerService: PostulerService,
    private sujetService:SujetService,
  ) { }

  ngOnInit(): void {
    this.getAccordes()
  }
  getAccordes() {
    this.accordes$ = this.postulerService.getAccordes().pipe(
      map((data) => {
        return ({ dataState: DataStateEnum.LOADED, data: data})
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((error) =>  of({dataState: DataStateEnum.ERROR,errorMessage:error.message }))
    )
  }

  editAccorder(accorder: any) {
    if (confirm("Etes vous sûr d'effectuer cette operation")) {
      if (accorder.valide) accorder.valide = false;
      else accorder.valide = true;
      this.postulerService.updateAccorde(accorder).subscribe(
        (data) => { alert("Success, changement validé") }
      )
    }
  }
}
