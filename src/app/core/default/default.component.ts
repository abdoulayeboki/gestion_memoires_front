import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../administration/services/etudiant.service';
import { Etudiant } from '../../administration/models/etudiant';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  etudiants: Etudiant[] | undefined
  etudiant: Etudiant | undefined
  color ="green"
  constructor(private etudiantService :EtudiantService) { }

  ngOnInit(): void {
    this.getEtudiants()
    
  }
  getEtudiants() {
    this.etudiantService.getEtudiants().subscribe(
      (data) => {
        console.log(data)
        this.etudiants = data
        
      },
      (error) => console.log(error)
   )
  }
  
}
