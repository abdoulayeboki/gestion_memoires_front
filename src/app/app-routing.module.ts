import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './core/default/default.component';
import { LoginComponent } from './core/login/login.component';
import { AuthGuardService } from './core/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: DefaultComponent ,canActivate:[AuthGuardService]},
  // { path: '', component: LoginComponent },
  {path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
