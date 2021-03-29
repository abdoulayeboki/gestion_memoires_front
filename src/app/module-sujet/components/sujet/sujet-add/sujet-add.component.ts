import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SujetService } from '../../../services/sujet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sujet-add',
  templateUrl: './sujet-add.component.html',
  styleUrls: ['./sujet-add.component.scss']
})
export class SujetAddComponent implements OnInit {
  sujetFormGroup?: FormGroup;
  submitted:boolean=false;
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
    console.log(this.sujetFormGroup?.value)
    this.sujetService.postSujets(this.sujetFormGroup?.value)
      .subscribe(data=>{
        alert("Success: sujet enregistre");
        this.router.navigate(['sujets'])
      });
  }
  onCancel() {
    this.router.navigate(['sujets'])
  }
  // get f() { return this.sujetFormGroup?.controls; }
}
