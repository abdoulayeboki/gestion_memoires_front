import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { AdministrationModule } from './administration/administration.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultComponent } from './core/default/default.component';
import { ModuleSujetModule } from './module-sujet/module-sujet.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './core/login/login.component';
import { AuthInterceptorService } from './core/services/auth-interceptor.service';
import {  ErrorInterceptorService } from './core/services/error-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DefaultComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdministrationModule,
    ModuleSujetModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
