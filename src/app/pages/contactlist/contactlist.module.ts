import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ContactlistRoutingModule } from './contactlist-routing.module';
import { ContactlistComponent } from './contactlist.component';


@NgModule({
  declarations: [
    ContactlistComponent
  ],
  imports: [
    CommonModule,
    ContactlistRoutingModule,Ng2SearchPipeModule,
    FormsModule
  ]
})
export class ContactlistModule { }
