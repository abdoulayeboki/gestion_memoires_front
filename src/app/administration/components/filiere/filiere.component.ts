import { Component, OnInit } from '@angular/core';
import { FiliereService } from '../../services/filiere.service';

@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.scss']
})
export class FiliereComponent implements OnInit {

  filieres: any
  constructor(private filiereService: FiliereService) { }

  ngOnInit(): void {
    this.getFilieres()
  }
  getFilieres() {
    this.filiereService.getFilieres().subscribe(
      (data) => {
        console.log(data)
        this.filieres =data
      },
      (error) => console.log(error)
   )
  }

}
