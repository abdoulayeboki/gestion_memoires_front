import { Component, OnInit } from '@angular/core';
import { EnseignentService } from '../../services/enseignent.service';

@Component({
  selector: 'app-enseignent',
  templateUrl: './enseignent.component.html',
  styleUrls: ['./enseignent.component.scss']
})
export class EnseignentComponent implements OnInit {
  enseignents: any
  constructor(private enseignentService: EnseignentService) { }

  ngOnInit(): void {
    this.getEnseignents()
  }
  getEnseignents() {
    this.enseignentService.getEnseignents().subscribe(
      (data) => {
        console.log(data)
        this.enseignents =data
      },
      (error) => console.log(error)
   )
  }

}
