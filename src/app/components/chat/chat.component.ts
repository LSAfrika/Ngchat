import { participant } from './../../interface/messages.interface';
import { tap, takeUntil } from 'rxjs/operators';
import { MessagesService } from './../../services/messages.service';
import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

destroy$=new Subject<number>()


  constructor(public ui:UiService,private msgservice:MessagesService) { }




  ngOnInit(): void {
    // this.names= this.ui.names
    console.log('current user: ',this.ui.authuser);
    // console.log('current user: ',this.ui.userchat);

  }
  ngOnDestroy(){
    this.destroy$.next(1)
    this.destroy$.complete()
    this.destroy$.unsubscribe()
  }

  fetchcurrentchat(chatparticipantid){
    this.msgservice.fetchthread(chatparticipantid).pipe(tap(res=>this.msgservice.chatthread$.next(res)),takeUntil(this.destroy$)).subscribe(
      ()=>{

     console.log('thread',this.msgservice.chatthread$.value);
     this.ui.scrolltobottomdesktop$.next(1)

      }
     )


  }
    viewprofile(currentuser){
console.log('user to view profile (logged in user)',currentuser);


if(currentuser._id==this.ui.authuser._id){

  const userprofile:participant={
  _id:currentuser._id,username:currentuser.username,profileimg:currentuser.profileimg,lastseen:0,online:true
  }
  this.ui.chatingwith=userprofile
}else{

  this.ui.chatingwith=currentuser
}


  this.ui.viewprofile$.next(true)
  console.log('profile component view: ',this.ui.viewprofile$.value);
  
}

  opencontacts(){
    this.ui.initialposition=1
  }

  closecontacts(){
    this.ui.initialposition=2
  }


  openchat(val:string){
    this.ui.usernameval=val
    this.ui.open_chat()
  }
  openbio(val:string){
    this.ui.usernameval=val

    this.ui.open_modal()
  }

  fetchuserchat(chatparticipantid:string,chatingwith:participant){

    this.ui.chatingwith=chatingwith
    console.log(chatparticipantid);
    this.ui.activechat$.next(true)
this.fetchcurrentchat(chatparticipantid)


  }


  identify(index, user){
    return user._id;
 }



}
