import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SujetComponent } from './components/sujet/sujet.component';
import { SujetListComponent } from './components/sujet/sujet-list/sujet-list.component';
import { SujetAddComponent } from './components/sujet/sujet-add/sujet-add.component';
import { SujetEditComponent } from './components/sujet/sujet-edit/sujet-edit.component';

const routes: Routes = [
  {
    path: "sujets", component: SujetComponent,
    children: [
      { path: "sujets_list", component: SujetListComponent, },
      { path: "sujet_add", component: SujetAddComponent, },
      { path: "sujet_edit/:id", component: SujetEditComponent, },
      {path: "", component: SujetListComponent,}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleSujetRoutingModule { }
