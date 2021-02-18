import { Component, OnInit } from '@angular/core';
import { SpecialiteService } from '../../services/specialite.service';
import { FormControl } from '@angular/forms';
import { FiliereService } from '../../services/filiere.service';

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrls: ['./specialite.component.scss']
})
export class SpecialiteComponent implements OnInit {

  specialites: any
  filieres: any
  search= new FormControl('')
  constructor(
    private specialiteService: SpecialiteService,
    private filiereService: FiliereService,
  ) { }

  ngOnInit(): void {
    this.getSpecialites()
    this.getFilieres()
  }
  getSpecialites() {
    this.specialiteService.getSpecialites(this.search.value).subscribe(
      (data) => {
        console.log(data)
        this.specialites =data
      },
      (error) => console.log(error)
   )
  }
  getFilieres() {
    this.filiereService.getFilieres(this.search.value).subscribe(
      (data) => {
        console.log(data)
        this.filieres =data
      },
      (error) => console.log(error)
   )
  }
  getSpecialiteByFiliere(idFiliere: string) {
    let id = parseInt(idFiliere)
    this.specialiteService.getSpecialiteByFiliere(id).subscribe(
      (data) => {
        console.log(data)
        this.specialites =data
      },
      (error) => console.log(error)
   )
  }
}
