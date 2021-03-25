import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SujetComponent } from './sujet/sujet.component';

const routes: Routes = [
  {path: "sujets", component:SujetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleSujetRoutingModule { }
