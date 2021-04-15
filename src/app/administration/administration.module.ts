import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { EnseignentComponent } from './components/enseignent/enseignent.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { DepartementComponent } from './components/departement/departement.component';
import { FiliereComponent } from './components/filiere/filiere.component';
import { SpecialiteComponent } from './components/specialite/specialite.component';
import { EtudiantService } from './services/etudiant.service';
import { ClasseComponent } from './components/classe/classe.component';
import { EnseignentService } from './services/enseignent.service';
import { DepartementService } from './services/departement.service';
import { FiliereService } from './services/filiere.service';
import { SpecialiteService } from './services/specialite.service';
import { ClasseService } from './services/classe.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    EtudiantComponent, EnseignentComponent, DepartementComponent, FiliereComponent,
    SpecialiteComponent, ClasseComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    EtudiantService,
    EnseignentService,
    DepartementService,
    FiliereService,
    SpecialiteService,
    ClasseService,
  ]
})
export class AdministrationModule { }
