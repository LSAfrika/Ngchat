import { MessagesComponent } from './../components/messages/messages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../components/nav/nav.component';
import { SidenavComponent } from '../components/sidenav/sidenav.component';
import { ChatComponent } from '../components/chat/chat.component';

import { ChatpageComponent } from '../components/chatpage/chatpage.component';


import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavComponent,
    SidenavComponent,
    ChatComponent,

    ChatpageComponent,

    MessagesComponent,

  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    NavComponent,
    SidenavComponent,
    ChatComponent,

    ChatpageComponent,


    MessagesComponent
  ]
})
export class SharedModule { }
