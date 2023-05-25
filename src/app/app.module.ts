
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { LoginComponent } from './components/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import{HttpClientModule}from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from'@angular/platform-browser/animations'
// import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
// MessagesComponent,
    LoginComponent,
    LoginFormComponent,
     RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,FormsModule,
Ng2SearchPipeModule
    // SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
