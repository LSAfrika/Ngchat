import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',loadChildren:()=> import('./components/home/home.module').then(m=>m.HomeModule),canActivate:[LoginGuard]},
  { path: 'contacts', loadChildren: () => import('./pages/contactlist/contactlist.module').then(m => m.ContactlistModule),canActivate:[LoginGuard] },
  { path: 'directmessage/:id', loadChildren: () => import('./pages/directmessage/directmessage.module').then(m => m.DirectmessageModule),canActivate:[LoginGuard] },
  { path: 'profile/:id', loadChildren: () => import('./pages/userprofile/userprofile.module').then(m => m.UserprofileModule),canActivate:[LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
