import { Component, OnInit } from '@angular/core';
import { EnseignentService } from '../../services/enseignent.service';
import { FormControl } from '@angular/forms';
import { DepartementService } from '../../services/departement.service';

@Component({
  selector: 'app-enseignent',
  templateUrl: './enseignent.component.html',
  styleUrls: ['./enseignent.component.scss']
})
export class EnseignentComponent implements OnInit {
  enseignents: any
  search = new FormControl('');
  departements: any
  constructor(
    private enseignentService: EnseignentService,
    private departementService: DepartementService,
  ) { }
 
  ngOnInit(): void {
    this.getEnseignents()
    this.getDepartements()
  }
  getDepartements() {
    this.departementService.getDepartements(this.search.value).subscribe(
      (data) => {
        console.log(data)
        this.departements =data
      },
      (error) => console.log(error)
   )
  }
  getEnseignentByDepartement(codeDepartement: string) {
    let code = parseInt(codeDepartement)
    console.log(code)
    this.enseignentService.getEnseignentByDepartement(code).subscribe(
      (data) => {
        console.log(data)
        this.enseignents =data
      },
      (error) => console.log(error)
   )
  }
  getEnseignents() {
    this.enseignentService.getEnseignents(this.search.value).subscribe(
      (data) => {
        console.log(data)
        this.enseignents =data
      },
      (error) => console.log(error)
   )
  }
  
}
