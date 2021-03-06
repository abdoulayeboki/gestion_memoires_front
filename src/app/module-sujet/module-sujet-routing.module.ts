import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SujetComponent } from './components/sujet/sujet.component';
import { SujetListComponent } from './components/sujet/sujet-list/sujet-list.component';
import { SujetAddComponent } from './components/sujet/sujet-add/sujet-add.component';
import { SujetEditComponent } from './components/sujet/sujet-edit/sujet-edit.component';
import { SujetViewComponent } from './components/sujet/sujet-view/sujet-view.component';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { PostulerAddComponent } from './components/postuler/postuler-add/postuler-add.component';
import { ListAccorderComponent } from './components/accorder/list-accorder/list-accorder.component';
import { MesSujetsComponent } from './components/sujet/mes-sujets/mes-sujets.component';
// import { ValiderFormComponent } from './components/valider/valider-form/valider-form.component';
import { SujetValiderComponent } from './components/valider/sujet-valider/sujet-valider.component';

const routes: Routes = [
  {
    path: "sujets", component: SujetComponent, canActivate:[AuthGuardService] ,
    children: [
      { path: "sujets_list", component: SujetListComponent, canActivate:[AuthGuardService] },
      { path: "sujet_add", component: SujetAddComponent, canActivate:[AuthGuardService] },
      { path: "sujet_edit/:id", component: SujetEditComponent, canActivate:[AuthGuardService] },
      { path: "sujet_view/:id", component: SujetViewComponent, canActivate: [AuthGuardService] },
      { path: "postuler_add/:id", component: PostulerAddComponent, canActivate: [AuthGuardService] },
      { path: "accorder_list", component: ListAccorderComponent, canActivate: [AuthGuardService] },
      { path: "mes_sujets", component: MesSujetsComponent, canActivate: [AuthGuardService] },
      { path: "sujet_valider", component: SujetValiderComponent, canActivate: [AuthGuardService] },
      // { path: "form_valider", component: ValiderFormComponent, canActivate:[AuthGuardService] },
      {path: "", component: SujetListComponent, canActivate:[AuthGuardService]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleSujetRoutingModule { }
