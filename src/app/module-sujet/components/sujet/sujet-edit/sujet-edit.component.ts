import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, startWith } from 'rxjs/operators';
import { SujetService } from '../../../services/sujet.service';
import { of, Observable } from 'rxjs';
import { AppDataState, DataStateEnum } from '../../../../core/models/app-data-state';

@Component({
  selector: 'app-sujet-edit',
  templateUrl: './sujet-edit.component.html',
  styleUrls: ['./sujet-edit.component.scss']
})
export class SujetEditComponent implements OnInit, OnDestroy {
  sujetId: number =0;
  sub: any;
  sujetFormGroup?:FormGroup;
  submitted: boolean = false;
  sujet$: Observable<AppDataState<any>> | undefined
  readonly DataStateEnum = DataStateEnum;
  constructor(private activatedRoute:ActivatedRoute,
              private sujetService:SujetService,
              private router: Router,
              private fb:FormBuilder) {
    // this.sujetId=activatedRoute.snapshot.params.id;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(param => {this.sujetId = param['id']})
    this.sujetService.getSujet(this.sujetId)
      .subscribe(sujet=>{
        this.sujetFormGroup = this.fb.group({
          id: [sujet.id, Validators.required],
          personnel: [sujet.personnel, Validators.required],
          titre:[sujet.titre,Validators.required],
          description:[sujet.description,Validators.required],
        })
      });
  }
  onSubmit() {
    this.submitted = true;
    if (this.sujetFormGroup?.invalid) return;
    this.sujet$ = this.sujetService.updateSujet(this.sujetFormGroup?.value).pipe(
      map((data) => {
        setTimeout(() => { this.sujet$ = undefined; this.router.navigate(['sujets']) }, 5000)
        this.submitted = false;
        return ({ dataState: DataStateEnum.LOADED, data: data})
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((error) =>  of({dataState: DataStateEnum.ERROR,errorMessage:error }))
    )
  }
  onCancel() {
    this.router.navigate(['sujets'])
  }

}
