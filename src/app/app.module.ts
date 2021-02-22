import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { AdministrationModule } from './administration/administration.module';
import { HttpClientModule } from '@angular/common/http';
import { DefaultComponent } from './core/default/default.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DefaultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdministrationModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
