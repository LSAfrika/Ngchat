import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../components/nav/nav.component';
import { SidenavComponent } from '../components/sidenav/sidenav.component';
import { ChatComponent } from '../components/chat/chat.component';
import { ContactsComponent } from '../components/contacts/contacts.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { ChatpageComponent } from '../components/chatpage/chatpage.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { TabsComponent } from '../components/tabs/tabs.component';



@NgModule({
  declarations: [
    NavComponent,
    SidenavComponent,
    ChatComponent,
    ContactsComponent,
    SettingsComponent,
    ChatpageComponent,
    ProfileComponent,
    TabsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NavComponent,
    SidenavComponent,
    ChatComponent,
    ContactsComponent,
    SettingsComponent,
    ChatpageComponent,
    ProfileComponent,
    TabsComponent
  ]
})
export class SharedModule { }
