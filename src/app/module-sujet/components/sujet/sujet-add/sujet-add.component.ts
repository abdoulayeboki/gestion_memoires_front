import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SujetService } from '../../../services/sujet.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppDataState, DataStateEnum } from '../../../../core/models/app-data-state';
import { catchError, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-sujet-add',
  templateUrl: './sujet-add.component.html',
  styleUrls: ['./sujet-add.component.scss']
})
export class SujetAddComponent implements OnInit {
  sujetFormGroup?: FormGroup;
  submitted: boolean = false;
  sujet$: Observable<AppDataState<any>> | undefined
  readonly DataStateEnum = DataStateEnum;
  constructor(
    private fb: FormBuilder,
    private sujetService: SujetService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.sujetFormGroup =this.fb.group ({
      titre: ["", Validators.required],
      description:["",Validators.required],
    })
  }
  onSubmit() {
    this.submitted = true;
    if (this.sujetFormGroup?.invalid) return;
    this.sujet$ = this.sujetService.postSujets(this.sujetFormGroup?.value).pipe(
      map((data) => {
        setTimeout(() => this.sujet$ = undefined, 10000)
        this.sujetFormGroup?.reset()
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
  // get f() { return this.sujetFormGroup?.controls; }
}
