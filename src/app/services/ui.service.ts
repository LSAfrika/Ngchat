import { participant } from './../interface/messages.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthUser, contacts } from '../interface/user.interfaces';
import { chatlist } from '../interface/messages.interface';

@Injectable({
  providedIn: 'root'
})
export class UiService {


  samechatid=''
  viewprofile$=new BehaviorSubject<boolean>(false)
  scrolltobottomdesktop$=new Subject<number>()
  activechat$=new BehaviorSubject(false)
  chatingwith:participant=undefined
  initialposition=0
  screenbraekpoint:BehaviorSubject<number>=new BehaviorSubject (0)
  unreadcounter=0
  editmodal=new BehaviorSubject(false)
  personalcontacts:BehaviorSubject<contacts[]>=new BehaviorSubject(undefined)
  allcontacts:BehaviorSubject<contacts[]>=new BehaviorSubject(undefined)
  userchats:BehaviorSubject<chatlist[]>=new BehaviorSubject([])

  contactmodal =new BehaviorSubject(false)
  scrolltobottom$:BehaviorSubject<number>=new BehaviorSubject(0)
  tab=1
  userlist=0
  ispersonalprofile=false
  authuser:AuthUser
  islogedin = false
  openmodal=false
  openchatpage=false
  chatpageanimation=''
  darkmode=false
  shrinknav=''
  form=''
  usernameval=''
  currentchatuserid=''
 // names =[{name:'henry'},{name:'chege'},{name:'wilson'},{name:'jane'},{name:'camil'},{name:'mary'},{name:'john'},{name:'david'},{name:'rafael'},{name:'raphael'},{name:'kim'},{name:'henry'}]
  selecteduser:number=0
  constructor() { }

  open_modal(){
this.openmodal=true
  }
  close_modal(){
    this.openmodal=false;
  }

  desktopchatscrolltobotton(){
    return this.scrolltobottomdesktop$.asObservable()
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

  //  username(){


  //   return this.names[this.selecteduser]
  // }

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
