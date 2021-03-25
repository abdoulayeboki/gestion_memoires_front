import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleSujetRoutingModule } from './module-sujet-routing.module';
import { SujetComponent } from './sujet/sujet.component';
import { SujetNavbarComponent } from './sujet-navbar/sujet-navbar.component';
import { SujetListComponent } from './sujet-list/sujet-list.component';
import { SujetService } from './services/sujet.service';


@NgModule({
  declarations: [SujetComponent, SujetNavbarComponent, SujetListComponent],
  imports: [
    CommonModule,
    ModuleSujetRoutingModule
  ],
  providers: [
    SujetService,
  ]
})
export class ModuleSujetModule { }
