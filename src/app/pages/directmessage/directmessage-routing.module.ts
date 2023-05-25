import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectmessageComponent } from './directmessage.component';

const routes: Routes = [{ path: '', component: DirectmessageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectmessageRoutingModule { }
