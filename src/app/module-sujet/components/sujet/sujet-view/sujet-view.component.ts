import { Component, OnInit } from '@angular/core';
import { SujetService } from '../../../services/sujet.service';
import { Sujet } from '../../../models/sujet';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sujet-view',
  templateUrl: './sujet-view.component.html',
  styleUrls: ['./sujet-view.component.scss']
})
export class SujetViewComponent implements OnInit {
  idSujet: number = 0;
  sujet?: Sujet;
  constructor(
    private sujetService: SujetService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {this.idSujet = param['id']})
    this.sujetService.getSujet(this.idSujet)
      .subscribe(sujet => {
          this.sujet = sujet
      });

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

}
