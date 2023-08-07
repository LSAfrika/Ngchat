import { tap } from 'rxjs/operators';
import { IOService } from './../../services/io.service';
import { MessagesService } from './../../services/messages.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { delay, takeUntil, Subject } from 'rxjs';
import{Message} from '../../interface/messages.interface'

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.scss']
})
export class ChatpageComponent implements OnInit {

  destroy$=new Subject()
  @ViewChild('chatview') private myScrollContainer: ElementRef;
  @ViewChild('messendtosend') messagetosend: ElementRef;

chat=''
  constructor(public ui:UiService,public msgservice:MessagesService,private io:IOService) { }

  ngOnInit(): void {

    console.log('chating with:',this.ui.chatingwith);
    
    this.ui.desktopchatscrolltobotton().pipe(delay(50)).subscribe(res=>{
      console.log('current res',res);
      this.scrollToBottom()
    })

this.newmessage()
  }

  // closechat(){
  //   this.ui.close_chat()
  // }

   ngAfterViewInit(){
console.log('checking view',this.myScrollContainer);

  if(this.myScrollContainer !=undefined) return
   console.log('afterview checked init',this.myScrollContainer)
  //  this.scrollToBottom()



   }

   newmessage(){
    this.io.getNewMessage()
    .pipe(
      tap(  (res:Message)=>{
        console.log('user chat emission: ',res)
       // console.log(' chat emission id: ',res)


     if(res ==undefined) return
     if(res._id== this.ui.samechatid) return console.log('last chat emission')
     if(res.from!= this.ui.chatingwith._id) return console.log('not chat owner')

       this.msgservice.chatthread$.next([...this.msgservice.chatthread$.value,res])
       this.ui.samechatid=res._id

   const callbackpayload={
     ...res,
     to:this.ui.authuser._id
   }
   console.log('loggedin user',this.ui.authuser._id);
   console.log('callback payload',callbackpayload);

         this.io.messagereceived(callbackpayload)

     setTimeout(() => {

        this.scrollToBottom()
     }, 50);


   }),
      takeUntil(this.destroy$))
      .subscribe( )
   }

   viewprofile(userprofile)
   {
console.log('user to view profile (chat page)',userprofile);

     this.ui.viewprofile$.next(true)
  console.log('profile component view: ',this.ui.viewprofile$.value);

   }

   scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
         console.log('scrolling to bottrom');

    } catch (err) {
      console.log(err.message);

     }
}

sendmessage(){


  if (this.chat.trim() == '') { return alert('please input a chat message') }



  const sentmessagepayload:Message={
    message:this.chat,
    from:this.ui.authuser._id,
    to:this.ui.chatingwith._id,
    viewed:false
  }
  this.io.sendmessage(sentmessagepayload);
 console.log(this.io.sent);
 this.chat=''

 console.log('scroll bottom value bsubject: ',this.ui.scrolltobottom$.value);

 this.ui.scrolltobottom$.pipe(takeUntil(this.destroy$)).subscribe(()=>this.scrollToBottom())

 this.scrollToBottom()

}


fetcholderchats(){
  this.msgservice.messagepagination++
  this.msgservice.fetchthread(this.ui.chatingwith._id).pipe(
    tap(res=>{
      console.log('pagination \n','pagination number:',this.msgservice.messagepagination,'\nmessage rsponse',res);
      res.length>=20?this.ui.viewloadmorebutton=true:this.ui.viewloadmorebutton=false
      this.msgservice.chatthread$.next([...res,...this.msgservice.chatthread$.value]);
      console.log('current chat fetched',this.msgservice.chatthread$.value);
    }),





    takeUntil(this.destroy$))
    .subscribe()
}

}
