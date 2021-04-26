import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostulerService } from 'src/app/module-sujet/services/postuler.service';
import { Observable, of } from 'rxjs';
import { DataStateEnum, AppDataState } from '../../../../core/models/app-data-state';
import { map, startWith, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-postuler-add',
  templateUrl: './postuler-add.component.html',
  styleUrls: ['./postuler-add.component.scss']
})
export class PostulerAddComponent implements OnInit {

  postulerFormGroup?: FormGroup;
  submitted: boolean = false;
  idSujet: number = 0
  postuler$: Observable<AppDataState<any>> | undefined
  readonly DataStateEnum = DataStateEnum;
  constructor(
    private fb: FormBuilder,
    private postulerService: PostulerService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {  
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {this.idSujet = +param['id']})
    console.log(this.idSujet)
    this.postulerFormGroup =this.fb.group ({
      motivation: ["", Validators.required],
      file_cv:[null, Validators.required],
      sujet:[this.idSujet,Validators.required]
    })
  }

  onChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.postulerFormGroup?.get('file_cv')?.setValue(file);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.postulerFormGroup?.invalid) return;
    const formData = new FormData();
    formData.append('file_cv', this.postulerFormGroup?.get('file_cv')?.value);
    formData.append('motivation', this.postulerFormGroup?.get('motivation')?.value);
    formData.append('sujet', this.postulerFormGroup?.get('sujet')?.value);
    this.postuler$ = this.postulerService.postPostulerSujets(formData).pipe(
      map((data) => {
        this.postulerFormGroup?.reset()
        setTimeout(() => { this.postuler$ = undefined; this.router.navigate(['sujets']) }, 5000)
        this.submitted = false;
        return ({ dataState: DataStateEnum.LOADED, data: data})
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((error) => {
        setTimeout(() => { this.postuler$ = undefined; this.router.navigate(['sujets']) }, 5000);
        return of({ dataState: DataStateEnum.ERROR, errorMessage: error })
      })
    )
  }

  onCancel() {
    this.router.navigate(['sujets'])
  }
}
