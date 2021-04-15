import { Component, OnChanges, OnInit } from '@angular/core';
import { catchError, map, mergeMap, startWith } from 'rxjs/operators';
import { EtudiantService } from '../../services/etudiant.service';
import { Etudiant } from '../../models/etudiant';
import { Classe } from '../../models/classe';
import { ClasseService } from '../../services/classe.service';
import { PromotionService } from '../../services/promotion.service';
import { Promotion } from '../../models/promotion';
import { FormControl } from '@angular/forms';
import { DataStateEnum } from 'src/app/core/models/app-data-state';
import { AppDataState } from '../../../core/models/app-data-state';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent implements OnInit, OnChanges {
  etudiants: Observable<AppDataState<any>> | undefined;
  codeClasse: string='';
  niveau: string = '';
  codePromotion: string=""
  classes: Classe[] | any;
  promotions: Promotion[] | any;
  search = new FormControl('');
  idPromotion: number = 0;
  idClasse: number = 0;
  idFiliere: number = 0;
  page: number = 1;
  readonly DataStateEnum= DataStateEnum
  niveaux = [
    { code: "BTS", nom: "BTS" },
    { code: "L3", nom: "Licence 3" },
    { code: "M2", nom: "Master 2" },
    { code: "T1", nom: "These 1" },
    { code: "T2", nom: "These 2" },
    { code: "T3", nom: "These 3" },
  ]
  valeur: string = "";
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
  
  ngOnChanges(): void {
    console.log("sarr")
  }
  getEtudiants() {
    this.etudiants = this.etudiantService.getEtudiants(this.search.value).pipe(
      map(data => {
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError( (error) =>of( {dataState: DataStateEnum.ERROR, errorMessage:error.message}))
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
    this.etudiants = this.etudiantService.getEtudiantByFilter(this.idPromotion, this.idClasse, this.niveau).pipe(
      map(data => {
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError( (error) =>of( {dataState: DataStateEnum.ERROR, errorMessage:error.message}))
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
