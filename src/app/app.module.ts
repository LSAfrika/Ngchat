import { MessagesComponent } from './components/messages/messages.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import{HttpClientModule}from '@angular/common/http'
import { FormsModule } from '@angular/forms';
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
    HttpClientModule,FormsModule,
    // SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
