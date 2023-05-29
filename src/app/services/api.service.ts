import { UiService } from 'src/app/services/ui.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import {getAuth ,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signOut  } from "firebase/auth"
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  destroy$=new Subject()
  URL='http://localhost:3000'
    app=
  initializeApp(environment.firebaseConfig)
  auth=getAuth()
  googleprovider=new GoogleAuthProvider()
  constructor(private http:HttpClient,private router:Router,private ui:UiService) {
console.log('service being initialized');

   // this.initializeFB()
  }

  initialresponse(){
    return this.http.get(this.URL)
  }

  initializeFBAPP(){
    return initializeApp(environment.firebaseConfig)
  }

//   initializeFB(){
//  this.app=initializeApp(environment.firebaseConfig)
//   }

async googlesignin(){
  try {
    const signinresult= await signInWithPopup(this.auth,this.googleprovider)
    const token= await signinresult.user.getIdToken()
    // console.log('token from sign in:',token);
    //.pipe(map(serverresponse=>(console.log('response received from server:\n',serverresponse))))
    this.usersignin(token).pipe(takeUntil(this.destroy$)).subscribe((res:any)=>{
      console.log(res);
      localStorage.setItem('token',res.token)
      localStorage.setItem('refreshtoken',res.refreshtoken)


      this.router.navigateByUrl('/')

    },err=>{console.log('log in error:\n',err);
    })
  } catch (error:any) {

    console.log(error.message);
    console.log('FULL SIGNIN ERROR',error);


  }
}
async registerwithemail(email:string,password:string){
  try {


      const register = await createUserWithEmailAndPassword(this.auth,email,password)

      console.log('result: ',register);
  } catch (error:any) {
    console.log(error.message);

  }


}
async appsignout(){
  const res= await this.auth.signOut()

  console.log('google signout successful');

}


usersignin(token:string):Observable<any>{

  return this.http.post<any>(this.URL+'/user/socialogin',{firebasetoken:token})

}



}
