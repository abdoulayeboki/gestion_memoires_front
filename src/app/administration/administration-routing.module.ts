import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { EnseignentComponent } from './components/enseignent/enseignent.component';
import { DepartementComponent } from './components/departement/departement.component';
import { FiliereComponent } from './components/filiere/filiere.component';
import { SpecialiteComponent } from './components/specialite/specialite.component';
import { ClasseComponent } from './components/classe/classe.component';
import { AuthGuardService } from '../core/services/auth-guard.service';

const routes: Routes = [
  { path: "etudiants", component: EtudiantComponent, canActivate:[AuthGuardService] },
  { path: "enseignents", component: EnseignentComponent, canActivate:[AuthGuardService] },
  { path: "departements", component: DepartementComponent, canActivate:[AuthGuardService] },
  { path: "filieres", component: FiliereComponent, canActivate:[AuthGuardService] },
  { path: "specialites", component: SpecialiteComponent, canActivate:[AuthGuardService] },
  { path: "classes", component: ClasseComponent, canActivate:[AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
