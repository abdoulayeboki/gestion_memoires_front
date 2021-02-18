import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../../services/classe.service';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {

  classes: any
  constructor(private classeService: ClasseService) { }

  ngOnInit(): void {
    this.getClasses()
  }
  getClasses() {
    this.classeService.getClasses().subscribe(
      (data) => {
        console.log(data)
        this.classes =data
      },
      (error) => console.log(error)
   )
  }

}
