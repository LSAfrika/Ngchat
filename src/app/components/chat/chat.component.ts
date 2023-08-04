import { IOService } from './../../services/io.service';
import { chatlist, participant } from './../../interface/messages.interface';
import { tap, takeUntil, map } from 'rxjs/operators';
import { MessagesService } from './../../services/messages.service';
import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subject, switchMap } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

destroy$=new Subject<number>()
menuguard=false
deleteindex=-1
chatparticipant:participant

  constructor(public ui:UiService,private msgservice:MessagesService,private io:IOService) { }




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

  logout(){
    this.io.userlogout( )
  }

  opendeletemodal(user:participant,index:number){
    this.chatparticipant=user
    this.ui.opendeletechatmodal=true
    this.deleteindex=index
    console.log('user to delete',user,index);

  }

  deletechat(){

  const newchatlist=  this.ui.userchats.value.splice(this.deleteindex,1)
  console.log('new chatlist',newchatlist);

  if(this.ui.chatingwith._id==this.chatparticipant._id) this.ui.activechat$.next(false)

  setTimeout(() => {
    this.ui.opendeletechatmodal=false
  }, 500);


  }



  closedeletemodal(){
    this.ui.opendeletechatmodal=false
  }


  fetchuserchat(chatparticipantid:string,chatingwith:participant){

    console.log('state of menu guard',this.menuguard);

    if(this.menuguard==true)return

    this.ui.chatingwith=chatingwith
    console.log(chatparticipantid);
    this.ui.activechat$.next(true)
this.fetchcurrentchat(chatparticipantid)


  }


  fetchcurrentchat(chatparticipantid){


    if(this.ui.chatingwith._id==this.ui.currentchatuserid){console.log('user id is similar to previous click') ; return}
    this.ui.viewloadmorebutton=false
this.msgservice.messagepagination=0

console.log('pagination value reset:',this.msgservice.messagepagination);

this.msgservice.chatthread$.next([])
    this.msgservice.fetchthread(chatparticipantid).pipe(
      tap(res=>{

        res.length>=20?this.ui.viewloadmorebutton=true:this.ui.viewloadmorebutton=false
        this.msgservice.chatthread$.next([...res,...this.msgservice.chatthread$.value])
        console.log('initial chat fetch',this.msgservice.chatthread$.value);
      }),
      switchMap(()=>{ return this.msgservice.unreadcounterreset(chatparticipantid)}),
      switchMap(()=>{ return this.msgservice.fetchchatlist()}),

      tap((updatechatlist:chatlist[])=>{console.log('reset counter: ',updatechatlist);this.ui.userchats.next(updatechatlist)}),

      takeUntil(this.destroy$))
      .subscribe(
      ()=>{

    //  console.log('thread',this.msgservice.chatthread$.value);
     this.ui.currentchatuserid=chatparticipantid
     this.ui.scrolltobottomdesktop$.next(1)

      }
     )


  }

  livechatupdate(){
    this.io.chatlistupdate().pipe(map((res:any)=> {
      console.log('initial fetch: ',res);
if(res ==undefined) return []
     return res.userschatslist as chatlist[]}),
     takeUntil(this.destroy$)).subscribe(res=>{
      // console.log(res)
      this.ui.userchats.next(res)
    })
  }


    viewprofile(currentuser){
console.log('user to view profile (logged in user)',currentuser);


if(currentuser._id==this.ui.authuser._id){

  const userprofile:participant={
  _id:currentuser._id,username:currentuser.username,profileimg:currentuser.profileimg,lastseen:0,online:true,status:currentuser.status
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


  identify(index, user){
    return user._id;
 }



}
