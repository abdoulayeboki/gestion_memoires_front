import { Component, OnInit } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { EtudiantService } from '../../services/etudiant.service';
import { Etudiant } from '../../models/etudiant';
import { Classe } from '../../models/classe';
import { ClasseService } from '../../services/classe.service';
import { forkJoin } from 'rxjs';
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
    this.getFilterEtudiant()
    this.getClasses()
    this.getPromotions()
  }
  getEtudiants() {
    this.etudiantService.getEtudiants().subscribe(
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
  getEtudiantsByPromotion(codePromo: string) {
    this.codePromotion = codePromo;
    this.getFilterEtudiant()
  }
  getFilterEtudiant() {
    if (this.codeClasse !== '' && this.niveau !=='' && this.codePromotion !=='') {
      this.etudiantService.getEtudiants().pipe(
        map(
          (etudiant: Etudiant[]) => etudiant.filter(
            (etudiant: Etudiant) => 
                etudiant.classe.code === this.codeClasse &&
              etudiant.classe.specialite.niveau === this.niveau &&
              etudiant.promotion.code === this.codePromotion
          )
        )
      ).subscribe(
        (data) => {
          this.etudiants = data
          console.log(data)
        },
        (error) => console.log(error)
      )
    }else if (this.codeClasse !== '' && this.codePromotion !='') {
      this.etudiantService.getEtudiants().pipe(
        map(
          (etudiant: Etudiant[]) => etudiant.filter(
            (etudiant: Etudiant) => 
                etudiant.classe.code === this.codeClasse && etudiant.promotion.code === this.codePromotion
          )
        )
      ).subscribe(
        (data) => {
          this.etudiants = data
          console.log(data)
        },
        (error) => console.log(error)
      ) 
    }else if (this.niveau !== '' && this.codePromotion !='') {
      this.etudiantService.getEtudiants().pipe(
        map(
          (etudiant: Etudiant[]) => etudiant.filter(
            (etudiant: Etudiant) => 
            etudiant.classe.specialite.niveau === this.niveau && etudiant.promotion.code === this.codePromotion
          )
        )
      ).subscribe(
        (data) => {
          this.etudiants = data
          console.log(data)
        },
        (error) => console.log(error)
      ) 
    }else if (this.niveau !== '') {
      this.etudiantService.getEtudiants().pipe(
        map(
          (etudiant: Etudiant[]) => etudiant.filter(
            (etudiant: Etudiant) => 
            etudiant.classe.specialite.niveau === this.niveau 
          )
        )
      ).subscribe(
        (data) => {
          this.etudiants = data
          console.log(data)
        },
        (error) => console.log(error)
      ) 
    }else if (this.codeClasse !== '') {
      this.etudiantService.getEtudiants().pipe(
        map(
          (etudiant: Etudiant[]) => etudiant.filter(
            (etudiant: Etudiant) => 
            etudiant.classe.code === this.codeClasse 
          )
        )
      ).subscribe(
        (data) => {
          this.etudiants = data
          console.log(data)
        },
        (error) => console.log(error)
      ) 
    }else if (this.codePromotion !== '') {
      this.etudiantService.getEtudiants().pipe(
        map(
          (etudiant: Etudiant[]) => etudiant.filter(
            (etudiant: Etudiant) => 
            etudiant.promotion.code === this.codePromotion
          )
        )
      ).subscribe(
        (data) => {
          this.etudiants = data
          console.log(data)
        },
        (error) => console.log(error)
      ) 
    }
    else {
      this.getEtudiants()
    }
    
  }
  getEtudiantsByClasse(codeClasse: string) {
    this.codeClasse = codeClasse;
    this.getFilterEtudiant()
  }
  getEtudiantsByNiveau(niveau: string) {
    this.niveau = niveau
    this.getFilterEtudiant()
  }
  
  getEtudiantsByFiliere(idFiliere: number) {
    this.etudiantService.getEtudiants().pipe(
      map(
        (etudiant: Etudiant[]) => etudiant.filter(
          (etudiant: Etudiant) => etudiant.classe.specialite.filiere.id == idFiliere
        )
      )
    ).subscribe(
      (data) => {
        this.etudiants =data
        console.log(data)
      },
      (error) => console.log(error)
   )
  }
  
  getEtudiantBySearch() {
    console.log(this.search.value)
    this.etudiantService.getEtudiantBySearch(this.search.value).subscribe(
      (data) => {
        console.log(data)
        this.etudiants =data
      },
      (error) => console.log(error)
   )
  }
}
