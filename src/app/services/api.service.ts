import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import {getAuth ,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword  } from "firebase/auth"
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL='http://localhost:3000/'
    app=
  initializeApp(environment.firebaseConfig)
  auth=getAuth()
  googleprovider=new GoogleAuthProvider()
  constructor(private http:HttpClient) { 
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
    console.log('result form sign in:',signinresult);
    
    
  } catch (error:any) {
    
    console.log(error.message);
    
    
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

 
}
