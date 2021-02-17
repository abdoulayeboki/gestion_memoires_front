import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { EnseignentComponent } from './components/enseignent/enseignent.component';
import { AdministrationRoutingModule } from './administration-routing.module';


@NgModule({
  declarations: [EtudiantComponent, EnseignentComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
  ]
})
export class AdministrationModule { }
