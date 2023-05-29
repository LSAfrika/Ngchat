import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserprofileRoutingModule } from './userprofile-routing.module';
import { UserprofileComponent } from './userprofile.component';
import { EditprofileComponent } from '../../components/editprofile/editprofile.component';


@NgModule({
  declarations: [
    UserprofileComponent,
    EditprofileComponent
  ],
  imports: [
    CommonModule,
    UserprofileRoutingModule,
    FormsModule
  ]
})
export class UserprofileModule { }
