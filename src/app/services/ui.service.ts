import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  tab=1
  ispersonalprofile=false
  islogedin = false
  openmodal=false
  openchatpage=false
  chatpageanimation=''
  darkmode=false
  shrinknav=''
  form=''
  names =['henry','chege','wilson','jane','camil','mary','john','david','rafael','raphael','kim','henry',]
  selecteduser:number=0
  constructor() { }

  open_modal(){
this.openmodal=true
  }
  close_modal(){
    this.openmodal=false;
  }

  open_chat(){
 this.openchatpage=true
    
    this.shrinknav='lg:w-[25%]'
     if(this.darkmode){
    this.chatpageanimation='animatein darkmode'

     }else{
      this.chatpageanimation='animatein'
     }
  }
  close_chat(){
    this.shrinknav=''

    setTimeout(() => {
      
      this.openchatpage=false
    }, 1000);
    this.chatpageanimation='animateout'

  }

  username():string{
    return this.names[this.selecteduser]
  }

  loginform(){
    this.form='login'
  }
  registerform(){
    this.form='register'
  }

  backtologin(s:string){
    this.form=s

    setTimeout(() => {
      this.form=''
    }, 1000);
  }

  activatedarkmode(){
    this.darkmode=!this.darkmode
  }


}
