import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SujetService } from '../../../services/sujet.service';

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
        alert("Success Saving product");
      });
  }
  // get f() { return this.sujetFormGroup?.controls; }
}
