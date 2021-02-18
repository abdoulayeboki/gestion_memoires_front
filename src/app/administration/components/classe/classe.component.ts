import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../../services/classe.service';
import { FormControl } from '@angular/forms';
import { Filiere } from '../../models/filiere';
import { FiliereService } from '../../services/filiere.service';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {

  classes: any
  search = new FormControl('')
  filieres : any
  constructor(
    private classeService: ClasseService,
    private filiereService: FiliereService
  ) { }

  ngOnInit(): void {
    this.getClasses()
    this.getFilieres()
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
  getClasseByFiliere(idFiliere: string) {
    let id = parseInt(idFiliere)
    this.classeService.getClasseByFiliere(id).subscribe(
      (data) => {
        console.log(data)
        this.classes =data
      },
      (error) => console.log(error)
   )
  }
  getClasses() {
    this.classeService.getClasses(this.search.value).subscribe(
      (data) => {
        console.log(data)
        this.classes =data
      },
      (error) => console.log(error)
   )
  }

}
