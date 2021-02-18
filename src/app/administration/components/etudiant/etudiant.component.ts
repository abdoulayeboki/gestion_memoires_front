import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { EtudiantService } from '../../services/etudiant.service';
import { Etudiant } from '../../modeles/etudiant';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent implements OnInit {
  etudiants: any
  constructor(private etudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.getEtudiant()
  }
  getEtudiant() {
    this.etudiantService.getEtudiant().subscribe(
      (data) => {
        console.log(data)
        this.etudiants =data
      },
      (error) => console.log(error)
   )
  }
  getEtudiantByPromotion(idPromo: number) {
    this.etudiantService.getEtudiant().pipe(
      map(
        (etudiant: Etudiant[]) => etudiant.filter(
          (etudiant: Etudiant) => etudiant.promotion.id === idPromo
        )
      )
    ).subscribe(
      (data) => {
        console.log(data)
        this.etudiants =data
      },
      (error) => console.log(error)
   )
  }
  
  getEtudiantByClasse(idClasse: number) {
    this.etudiantService.getEtudiant().pipe(
      map(
        (etudiant: Etudiant[]) => etudiant.filter(
          (etudiant: Etudiant) => etudiant.classe.id === idClasse
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
  getEtudiantByNiveau(niveau: string) {
    this.etudiantService.getEtudiant().pipe(
      map(
        (etudiant: Etudiant[]) => etudiant.filter(
          (etudiant: Etudiant) => etudiant.classe.specialite.niveau === niveau
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
  
  getEtudiantByFiliere(idFiliere: number) {
    this.etudiantService.getEtudiant().pipe(
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
}
