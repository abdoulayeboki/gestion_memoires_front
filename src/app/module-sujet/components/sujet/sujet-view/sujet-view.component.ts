import { Component, OnInit } from '@angular/core';
import { SujetService } from '../../../services/sujet.service';
import { Sujet } from '../../../models/sujet';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../../../core/services/auth-service.service';
import { Personnel } from '../../../../administration/models/personnel';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-sujet-view',
  templateUrl: './sujet-view.component.html',
  styleUrls: ['./sujet-view.component.scss']
})
export class SujetViewComponent implements OnInit {
  idSujet: number = 0;
  sujet?: Sujet;
  personnel?: Personnel;
  constructor(
    private sujetService: SujetService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService:AuthServiceService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {this.idSujet = param['id']})
    this.sujetService.getSujet(this.idSujet)
      .subscribe(sujet => {
          this.sujet = sujet
      });
   // recuperons le personnel actuellement connecte
   this.authService.userObservable.pipe(
    concatMap(user => this.authService.getUserById(user.id) )
  ).subscribe(user => this.personnel = user.personnel)
  }

  deleteSujet() {
    if(confirm("etes vs sur de vouloir supprimer ce sujet"))
    this.sujetService.deleteSujet(this.sujet)
      .subscribe(sujet => {
        alert("deleting success");
        this.router.navigate(['sujets'])
      });
  }

  onCancel() {
    this.router.navigate(['sujets'])
  }
  // owner permet de verifier si la personne est proprietaire du sujet pour pouvoir modifie ou non
  owner(sujet:Sujet): Boolean{
    if (this.personnel?.id==sujet.personnel)
      return true
    else return false
  }
}
