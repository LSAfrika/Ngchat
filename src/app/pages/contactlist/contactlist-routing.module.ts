import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactlistComponent } from './contactlist.component';

const routes: Routes = [{ path: '', component: ContactlistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactlistRoutingModule { }
