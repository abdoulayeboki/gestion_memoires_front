import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SujetComponent } from './components/sujet/sujet.component';
import { SujetListComponent } from './components/sujet/sujet-list/sujet-list.component';
import { SujetAddComponent } from './components/sujet/sujet-add/sujet-add.component';
import { SujetEditComponent } from './components/sujet/sujet-edit/sujet-edit.component';
import { SujetViewComponent } from './components/sujet/sujet-view/sujet-view.component';
import { AuthGuardService } from '../core/services/auth-guard.service';

const routes: Routes = [
  {
    path: "sujets", component: SujetComponent, canActivate:[AuthGuardService] ,
    children: [
      { path: "sujets_list", component: SujetListComponent, canActivate:[AuthGuardService] },
      { path: "sujet_add", component: SujetAddComponent, canActivate:[AuthGuardService] },
      { path: "sujet_edit/:id", component: SujetEditComponent, canActivate:[AuthGuardService] },
      { path: "sujet_view/:id", component: SujetViewComponent, canActivate:[AuthGuardService] },
      {path: "", component: SujetListComponent, canActivate:[AuthGuardService]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleSujetRoutingModule { }
