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
  if(this.chat.length==0) return
  console.log(this.chat);
  this.chat=''

}

}
