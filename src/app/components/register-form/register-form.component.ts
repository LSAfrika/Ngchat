import { Component, OnInit } from '@angular/core';

import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  username=''
  email=''
  phone=0
  password=''
  repassword=''
  constructor(public ui:UiService) { }

  ngOnInit(): void {

  }

  validation(){
    if(this.username.trim().length===0){ return alert('username field is empty')}
    if(this.email.trim().length===0){ return alert('email field is empty')}
    if(this.phone.toString().trim().length===0){ return alert('phone field is empty')}
    if(this.password.trim().length===0){ return alert('password field is empty')}
    if(this.repassword.trim().length===0){ return alert('re enter password field is empty')}
    if(this.password!==this.repassword){return alert ('password miss match')}
    if(this.ValidateEmail(this.email)!==true){return alert ('please enter a valid email adress')}
  }

  ValidateEmail(mail:string):boolean {if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){return (true)}return (false)}
  
  submitform(){
    this.validation()
    console.log('all validations have passed');
    
  }

}
