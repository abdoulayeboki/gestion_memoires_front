import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SujetService } from '../../../services/sujet.service';

@Component({
  selector: 'app-sujet-edit',
  templateUrl: './sujet-edit.component.html',
  styleUrls: ['./sujet-edit.component.scss']
})
export class SujetEditComponent implements OnInit {
  sujetId:number;
  sujetFormGroup?:FormGroup;
  submitted:boolean=false;
  constructor(private activatedRoute:ActivatedRoute,
              private sujetService:SujetService,
              private fb:FormBuilder) {
    this.sujetId=activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.sujetService.getSujet(this.sujetId)
      .subscribe(sujet=>{
        this.sujetFormGroup=this.fb.group({
          titre:[sujet.titre,Validators.required],
          decription:[sujet.description,Validators.required],
        })
      });
  }

  onUpdatesujet() {
    // this.sujetService.updatesujet(this.sujetFormGroup?.value)
    //   .subscribe(data=>{
    //     alert("Success sujet updated");
    //   });
  }
}
