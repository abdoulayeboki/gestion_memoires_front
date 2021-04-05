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
      cv: ["", Validators.required],
      sujet:[this.idSujet,Validators.required]
    })
  }
  onSubmit() {
    this.submitted = true;
    if (this.postulerFormGroup?.invalid) return;
    console.log(this.postulerFormGroup?.value)
    this.postulerService.postPostulerSujets(this.postulerFormGroup?.value)
      .subscribe((data)=>{
        alert("Success:vous avez postuler ");
        this.router.navigate(['sujets'])
      },
      // error => console.log(error)
    );
  }
  onCancel() {
    this.router.navigate(['sujets'])
  }
}
