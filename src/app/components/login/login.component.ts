import { UserService } from './../../services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login=false
  register=false
  registering=false
  passwordmissmatch=false
  passwordlengthmatch=false
  invalidemailmatch=false
  inavlidusernamelength=false

  registertext='register'
  inavlidemailnmatchmessage='invalid email format'
  inavlidusernamelengthmessage='username too short'
  passwordmissmatchmessage='password missmatch'
  passwordlengthmessage='min 6 charachters'
  email=''
  username=''
  password=''
  reenterpassword=''

  createusersub:Subscription
  loginusersub:Subscription

  emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  constructor(public ui:UiService,public api:ApiService,private router:Router,private user:UserService) {

    if(!!localStorage.getItem('token'))this.router.navigateByUrl('/')
  }

  ngOnInit(): void {
  }
toggleregister(){
  this.register=!this.register
  this.email=this.password=this.reenterpassword=this.username=''
}

emailvalidator(event){
  console.log(this.emailRegex.test(this.email))
  if(this.emailRegex.test(this.email)==false){
    this.invalidemailmatch=true

  }else{
    this.invalidemailmatch=false

  }
}
usernamevalidator(event){
  if(this.username.length!=0&&this.username.length<5)  this.inavlidusernamelength=true
  else this.inavlidusernamelength =false

}

passwordlength(ev){

  if(this.password.length!=0&&this.password.length<6) { this.passwordlengthmatch=true}
  else{this.passwordlengthmatch=false}

  if(this.reenterpassword.length!=0&&this.password != this.reenterpassword){
    this.passwordmissmatch=true
  }else{
    this.passwordmissmatch=false

  }

}

passwordmatch(ev){


  if(this.password != this.reenterpassword &&this.reenterpassword.length!=0){
    this.passwordmissmatch=true
  }else{
    this.passwordmissmatch=false

  }

}




registeruser(){

  if( this.email.length==0||this.username.length==0||this.password.length==0||this.reenterpassword.length==0 ) return alert('fill all fields')

  if(this.passwordmissmatch==true ||this.passwordlengthmatch==true ||this.invalidemailmatch==true ||this.inavlidusernamelength==true) return alert('form has errors')
 this.registering=true
 this.registertext='registering... '
  const payload={
    email:this.email,
    username:this.username,
   password: this.password,
   reenterpassword:this.reenterpassword
  }

  this.createusersub=this.user.createuser(payload).subscribe((res:any)=>{
  console.log('register responser',res);

  if(res.token!=undefined && res.refreshtoken !=undefined){

    if(res.token)localStorage.setItem('token',res.token)
    if(res.refreshtoken)localStorage.setItem('refreshtoken',res.refreshtoken)
    this.registering=false
    this.registertext='register '
    alert(res.message)
    this.router.navigateByUrl('/')
    this.register=false

      this.createusersub.unsubscribe()
  }

},err=>{

  alert(`${payload.email} has an account `)
  localStorage.removeItem('token')
  localStorage.removeItem('refreshtoken')
  this.registering=false
this.registertext='register'
  console.log(err)
})



}

loginuser(){

  if( this.email.length==0||this.password.length==0) return alert('fill all fields')

  if(this.passwordlengthmatch==true ||this.invalidemailmatch==true ) return alert('form has errors')

  const loginpayload={
    email:this.email,
    password:this.password
  }
console.log('login payload: ',loginpayload);
this.loginusersub=this.user.loginuser(loginpayload).subscribe((res:any)=>{

  if(res.token!=undefined&&res.refreshtoken!=undefined){
    localStorage.setItem('token',res.token)
    localStorage.setItem('refreshtoken',res.refreshtoken)
    alert(res.message)
    this.router.navigateByUrl('/')
    this.loginusersub.unsubscribe()
  }
},error=>{
  console.log(error);
  localStorage.removeItem('token')
  localStorage.removeItem('refreshtoken')
alert(error.error.message)
  this.loginusersub.unsubscribe()


})

}
}
