import { FormsModule } from '@angular/forms';
import { MessagesComponent } from './../components/messages/messages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../components/nav/nav.component';
import { SidenavComponent } from '../components/sidenav/sidenav.component';
import { ChatComponent } from '../components/chat/chat.component';

import { ChatpageComponent } from '../components/chatpage/chatpage.component';


import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../components/loading/loading.component';
import { ContactsComponent } from '../components/contacts/contacts.component';
import { ViewprofileComponent } from '../components/viewprofile/viewprofile.component';
import { DeletechatmodalComponent } from '../components/deletechatmodal/deletechatmodal.component';
import { WelcomeComponent } from '../components/welcome/welcome.component';



@NgModule({
  declarations: [
    NavComponent,
    SidenavComponent,
    ChatComponent,

    ChatpageComponent,

    MessagesComponent,
      LoadingComponent,
      ContactsComponent,
      ViewprofileComponent,
      DeletechatmodalComponent,
      WelcomeComponent

  ],
  imports: [
    CommonModule,
    RouterModule,FormsModule
  ],
  exports:[
    NavComponent,
    SidenavComponent,
    ChatComponent,
    ChatpageComponent,
    ContactsComponent,
    LoadingComponent,
    MessagesComponent,
    ViewprofileComponent,
    DeletechatmodalComponent,WelcomeComponent
  ]
})
export class SharedModule { }
