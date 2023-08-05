import { ContactlistModule } from './pages/contactlist/contactlist.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { LoginComponent } from './components/login/login.component';
import{HttpClientModule, HTTP_INTERCEPTORS}from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from'@angular/platform-browser/animations'
import { AuthInterceptor } from './services/auth.interceptor';
 import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,FormsModule,

Ng2SearchPipeModule,
     SharedModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
