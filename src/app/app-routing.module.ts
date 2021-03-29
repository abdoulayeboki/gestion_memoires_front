import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './core/default/default.component';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
  // { path: '', component: DefaultComponent },
  { path: '', component: LoginComponent },
  {path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
