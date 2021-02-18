import { Component, OnInit } from '@angular/core';
import { SpecialiteService } from '../../services/specialite.service';

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrls: ['./specialite.component.scss']
})
export class SpecialiteComponent implements OnInit {

  specialites: any
  constructor(private specialiteService: SpecialiteService) { }

  ngOnInit(): void {
    this.getSpecialites()
  }
  getSpecialites() {
    this.specialiteService.getSpecialites().subscribe(
      (data) => {
        console.log(data)
        this.specialites =data
      },
      (error) => console.log(error)
   )
  }
}
