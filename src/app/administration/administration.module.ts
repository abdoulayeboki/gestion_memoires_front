import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { EnseignentComponent } from './components/enseignent/enseignent.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { DepartementComponent } from './components/departement/departement.component';
import { FiliereComponent } from './components/filiere/filiere.component';
import { SpecialiteComponent } from './components/specialite/specialite.component';


@NgModule({
  declarations: [EtudiantComponent, EnseignentComponent, DepartementComponent, FiliereComponent, SpecialiteComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
  ]
})
export class AdministrationModule { }
