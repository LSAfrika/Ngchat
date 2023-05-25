import { Component } from '@angular/core';
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
  constructor(public ui:UiService,public api:ApiService){

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
