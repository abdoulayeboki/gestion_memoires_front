import { Component, OnInit } from '@angular/core';
import { DepartementService } from '../../services/departement.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {
  departements: any
  constructor(private departementService: DepartementService) { }

  ngOnInit(): void {
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

}
