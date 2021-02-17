import { Component, OnInit } from '@angular/core';
import { EtudiantService } from 'src/app/services/etudiant.service';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent implements OnInit {

  constructor(private etudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.getEtudiant()
  }
  getEtudiant() {
    this.etudiantService.getEtudiant().subscribe(
      data => {
        console.log(data)
        console.log("ok cela marche")
      },
      (error) => console.log(error)
   )
 }
}
