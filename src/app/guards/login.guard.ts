import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// , CanDeactivate<unknown>
export class LoginGuard implements CanActivate {
constructor(private router:Router){}

  canActivate() {
   // this.router.navigateByUrl('/')

   if(!!localStorage.getItem('token')) return true;

this.router.navigateByUrl('')
return false

  }


}
