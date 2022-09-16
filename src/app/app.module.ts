import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { NavComponent } from './components/nav/nav.component';
// import { TabsComponent } from './components/tabs/tabs.component';
// import { ChatComponent } from './components/chat/chat.component';
// import { ContactsComponent } from './components/contacts/contacts.component';
// import { SettingsComponent } from './components/settings/settings.component';
// import { ProfileComponent } from './components/profile/profile.component';
// import { ChatpageComponent } from './components/chatpage/chatpage.component';
// import { SidenavComponent } from './components/sidenav/sidenav.component';
// import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import{HttpClientModule}from '@angular/common/http'
import { FormsModule } from '@angular/forms';
// import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    // NavComponent,
    // TabsComponent,
    // ChatComponent,
    // ContactsComponent,
    // SettingsComponent,
    // ProfileComponent,
    // ChatpageComponent,
    // SidenavComponent,
    // HomeComponent,
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
