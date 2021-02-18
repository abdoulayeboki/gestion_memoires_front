import { Component, OnInit } from '@angular/core';
import { DepartementService } from '../../services/departement.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {
  departements: any
  search = new FormControl('');
  constructor(private departementService: DepartementService) { }

  ngOnInit(): void {
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

}
