import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { EnseignentComponent } from './components/enseignent/enseignent.component';
import { DepartementComponent } from './components/departement/departement.component';
import { FiliereComponent } from './components/filiere/filiere.component';
import { SpecialiteComponent } from './components/specialite/specialite.component';

const routes: Routes = [
  { path: "etudiants", component: EtudiantComponent },
  { path: "enseignents", component: EnseignentComponent },
  { path: "departements", component: DepartementComponent },
  { path: "filieres", component: FiliereComponent },
  { path: "specialites", component: SpecialiteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
