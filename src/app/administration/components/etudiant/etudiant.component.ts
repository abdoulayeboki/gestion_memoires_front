import { Component, OnInit } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { EtudiantService } from '../../services/etudiant.service';
import { Etudiant } from '../../models/etudiant';
import { Classe } from '../../models/classe';
import { ClasseService } from '../../services/classe.service';
import { PromotionService } from '../../services/promotion.service';
import { Promotion } from '../../models/promotion';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent implements OnInit {
  etudiants: any;
  codeClasse: string='';
  niveau: string = '';
  codePromotion: string=""
  classes: Classe[] | any;
  promotions: Promotion[] | any;
  search = new FormControl('');
  idPromotion: number = 0;
  idClasse: number = 0;
  idFiliere: number = 0;
  niveaux = [
    { code: "BTS", nom: "BTS" },
    { code: "L3", nom: "Licence 3" },
    { code: "M2", nom: "Master 2" },
    { code: "T1", nom: "These 1" },
    { code: "T2", nom: "These 2" },
    { code: "T3", nom: "These 3" },
  ]
  constructor(
    private etudiantService: EtudiantService,
    private classeService: ClasseService,
    private promotionService: PromotionService,
  ) { }

  ngOnInit(): void {
    // this.getFilterEtudiant()
    this.getEtudiants()
    this.getClasses()
    this.getPromotions()
  }
  getEtudiants() {
    this.etudiantService.getEtudiants(this.search.value).subscribe(
      (data) => {
        console.log(data)
        this.etudiants =data
      },
      (error) => console.log(error)
   )
  }
  getPromotions() {
    this.promotionService.getPromotions().subscribe(
      (data) => {
        console.log(data)
        this.promotions =data
      },
      (error) => console.log(error)
   )
  }
  getClasses() {
    this.classeService.getClasses().subscribe(
      (data) => {
        console.log(data)
        this.classes =data
      },
      (error) => console.log(error)
   )
  }
  getEtudiantsByPromotion(idPromo: string) {
    this.idPromotion = parseInt(idPromo);
    this.getFilterEtudiant()
  }
  getFilterEtudiant() {
    this.etudiantService.getEtudiantByFilter(this.idPromotion, this.idClasse, this.niveau).subscribe(
      (data) => {
        this.etudiants = data
      }
    )
  }
  getEtudiantsByClasse(idClasse: string) {
    this.idClasse = parseInt(idClasse);
    this.getFilterEtudiant()
  }
  getEtudiantsByNiveau(niveau: string) {
    this.niveau = niveau
    this.getFilterEtudiant()
  }
  
}
