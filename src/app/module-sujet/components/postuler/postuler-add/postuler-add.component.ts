import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostulerService } from 'src/app/module-sujet/services/postuler.service';

@Component({
  selector: 'app-postuler-add',
  templateUrl: './postuler-add.component.html',
  styleUrls: ['./postuler-add.component.scss']
})
export class PostulerAddComponent implements OnInit {

  postulerFormGroup?: FormGroup;
  submitted: boolean = false;
  idSujet: number=0
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
    this.postulerService.postPostulerSujets(formData)
      .subscribe((data)=>{
        alert("Success:vous avez postuler ");
        this.router.navigate(['sujets'])
      },
      error =>alert("Erreur: Vous avez dèjà postulé à ce sujet")
    );
  }
  // onSubmit() {
  //   this.submitted = true;
  //   if (this.postulerFormGroup?.invalid) return;
  //   this.postulerService.postPostulerSujets(this.postulerFormGroup?.value)
  //     .subscribe((data)=>{
  //       alert("Success:vous avez postuler ");
  //       this.router.navigate(['sujets'])
  //     },
  //     error =>alert("Erreur: Vous avez dèjà postulé à ce sujet")
  //   );
  // }
  onCancel() {
    this.router.navigate(['sujets'])
  }
}
