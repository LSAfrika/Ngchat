import { Component, HostListener } from '@angular/core';
import { ApiService } from './services/api.service';
import { UiService } from './services/ui.service';
import { initializeApp } from "firebase/app";
import { ActivatedRoute } from '@angular/router';
import {getAuth ,signInWithPopup,GoogleAuthProvider } from "firebase/auth"
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[]
})

export class AppComponent {
  title = 'ngchat';
 // app=initializeApp(environment.firebaseConfig)
  auth=getAuth()
  googleprovider=new GoogleAuthProvider()

  SH=0
  SW=0


  @HostListener('window:resize', ['$event']) onResize() {

    this.SH = window.innerHeight;
    this.SW = window.innerWidth;
    //  console.log('port width: ', this.SW,this.SH);

     this.ui.screenbraekpoint.next(window.innerWidth)
// console.log('updated screen width bsubject',this.ui.screenbraekpoint.value);






  }



  constructor(public ui:UiService,public api:ApiService){

    this.SH=window.innerHeight
this.SW=window.innerWidth
this.ui.screenbraekpoint.next(window.innerWidth)

console.log('initial screen width bsubject',this.ui.screenbraekpoint.value);

//  this.app = this.api.initializeFBAPP()

    // this.api.initialresponse().subscribe(res=>console.log('server response: ',res))

  }

  async googlesignin(){
    try {
      const signinresult=signInWithPopup(this.auth,this.googleprovider)
      console.log('result form sign in:',signinresult);


    } catch (error:any) {

      console.log(error.message);


    }
  }

  prepareRoute(outlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }


}
