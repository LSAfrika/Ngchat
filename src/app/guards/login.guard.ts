import { UiService } from 'src/app/services/ui.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// , CanDeactivate<unknown>
export class LoginGuard implements CanActivate {
constructor(private router:Router,private ui:UiService){}

  canActivate() {
   // this.router.navigateByUrl('/')

   if(!!localStorage.getItem('token')) {

    const token=localStorage.getItem('token').split('.')[1]

    // console.log(token);

     const userbio= atob(token)
     this.ui.authuser=JSON.parse(userbio)
    console.log('current logedin user',this.ui.authuser);


    return true;}

this.router.navigateByUrl('')
return false

  }


}
