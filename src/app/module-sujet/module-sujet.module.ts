import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleSujetRoutingModule } from './module-sujet-routing.module';
import { SujetComponent } from './components/sujet/sujet.component';
import { SujetNavbarComponent } from './components/sujet/sujet-navbar/sujet-navbar.component';
import { SujetListComponent } from './components/sujet/sujet-list/sujet-list.component';
import { SujetService } from './services/sujet.service';
import { SujetAddComponent } from './components/sujet/sujet-add/sujet-add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SujetEditComponent } from './components/sujet/sujet-edit/sujet-edit.component';
import { SujetViewComponent } from './components/sujet/sujet-view/sujet-view.component';
import { PostulerAddComponent } from './components/postuler/postuler-add/postuler-add.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalPostulerComponent } from './components/postuler/modal-postuler/modal-postuler.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListAccorderComponent } from './components/accorder/list-accorder/list-accorder.component';
import { MesSujetsComponent } from './components/sujet/mes-sujets/mes-sujets.component';
import { ValiderFormComponent } from './components/valider/valider-form/valider-form.component';


@NgModule({
  declarations: [SujetComponent, SujetNavbarComponent, SujetListComponent,SujetAddComponent, SujetEditComponent, SujetViewComponent, PostulerAddComponent,ModalPostulerComponent, ListAccorderComponent, MesSujetsComponent, ValiderFormComponent],
  imports: [
    CommonModule,
    ModuleSujetRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule,
  ],
  providers: [
    SujetService,
  ]
})
export class ModuleSujetModule { }
