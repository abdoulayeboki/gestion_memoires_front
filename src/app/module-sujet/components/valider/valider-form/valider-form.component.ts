import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SujetService } from '../../../services/sujet.service';
import { PostulerService } from '../../../services/postuler.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-valider-form',
  templateUrl: './valider-form.component.html',
  styleUrls: ['./valider-form.component.scss']
})
export class ValiderFormComponent implements OnInit {
  @Input() idSujet: any;
  personnelAccorders: any = [];
  // form = new FormGroup({
  //   personnelAccorder: new FormControl(),
  // });
  form?: FormGroup ;
  p: number = 1;
  constructor(
    private sujetService: SujetService,
    private postulerService: PostulerService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAccord()
    this.form = this.fb.group({
      idPersonnel: this.fb.array([],Validators.required )
    });
  }
  getAccord() {
    this.sujetService.getSujet(this.idSujet).subscribe(
        (sujet) => {
        for (let p of sujet.personnelAccorder) {
          if (!(p.profil === "ETUDIANT" && p.nbr_sujet_valide > 0))
            this.personnelAccorders.push(p);  
          }
        }
    )
  }
  onSubmit() {
    console.log(this.form?.controls.idPersonnel.value)
    let listPerson = this.form?.controls.idPersonnel.value
    for (let idPerson of listPerson) {
      this.postulerService.postValiderSujets({ "sujet": this.idSujet, "personnel": +idPerson }).subscribe(
        (data) => {
          alert('success')
          window.location.reload();
        },
        (error) => alert(error.status)
      )
    }
}  

  onChange(e:any) {
    const personnelAccorders = (this.form?.controls.idPersonnel as FormArray);

    if (e.target.checked) {
      personnelAccorders.push(new FormControl(e.target.value));
    } else {
      const index = personnelAccorders.controls.findIndex(x => x.value === e.target.value);
      personnelAccorders.removeAt(index);
    }
  }

}


