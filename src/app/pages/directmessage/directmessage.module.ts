import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectmessageRoutingModule } from './directmessage-routing.module';
import { DirectmessageComponent } from './directmessage.component';


@NgModule({
  declarations: [
    DirectmessageComponent
  ],
  imports: [
    CommonModule,
    DirectmessageRoutingModule
  ]
})
export class DirectmessageModule { }
