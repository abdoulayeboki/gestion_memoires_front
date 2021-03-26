import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleSujetRoutingModule } from './module-sujet-routing.module';
import { SujetComponent } from './components/sujet/sujet.component';
import { SujetNavbarComponent } from './components/sujet/sujet-list/sujet-navbar/sujet-navbar.component';
import { SujetListComponent } from './components/sujet/sujet-list/sujet-list.component';
import { SujetService } from './services/sujet.service';
import { SujetAddComponent } from './components/sujet/sujet-add/sujet-add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SujetComponent, SujetNavbarComponent, SujetListComponent, SujetAddComponent],
  imports: [
    CommonModule,
    ModuleSujetRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    SujetService,
  ]
})
export class ModuleSujetModule { }
