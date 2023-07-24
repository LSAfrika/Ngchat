import { UiService } from './../services/ui.service';
import { Injectable } from '@angular/core';
import {  CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointGuard implements CanActivate {
  constructor(private ui:UiService,private router:Router){}
  canActivate(
   ){
   if(this.ui.screenbraekpoint.value<1000) {
    return true}
    else{
      // this.router.navigateByUrl('/')
      this.ui.viewprofile$.next(false)
    this.router.navigateByUrl('')

      return true}


  }

}
