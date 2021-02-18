import { Component, OnInit } from '@angular/core';
import { FiliereService } from '../../services/filiere.service';
import { FormControl } from '@angular/forms';
import { DepartementService } from '../../services/departement.service';

@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.scss']
})
export class FiliereComponent implements OnInit {

  filieres: any
  departements: any;
  search = new FormControl('')
  constructor(
    private filiereService: FiliereService,
    private departementService: DepartementService,
  ) { }

  ngOnInit(): void {
    this.getFilieres()
    this.getDepartements()
  }
  getDepartements() {
    this.departementService.getDepartements().subscribe(
      (data) => {
        console.log(data)
        this.departements =data
      },
      (error) => console.log(error)
   )
  }
  getFiliereByDepartement(idDepartement: string) {
    let id = parseInt(idDepartement)
    this.filiereService.getFiliereByDepartement(id).subscribe(
      (data) => {
        console.log(data)
        this.filieres =data
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

}
