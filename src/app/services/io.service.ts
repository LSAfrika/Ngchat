import { User } from './../interface/post.interface';
import { NotificationsService } from './notifications.service';
import { MessagesService } from './messages.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { Message } from '../interface/messages.interface';
import { UiService } from './ui.service';
import{environment} from '../../environments/environment'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class IOService {


  ngchatbackend = environment.API;
  // socket=io(this.ngchatbackend,{query:{uid:''}})
  sent=false
  socket:any=undefined
  public message$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public userconnectionstatus$: Subject<any> = new Subject();
  public messagenotifications$: BehaviorSubject<Object> = new BehaviorSubject(undefined);
  public messagenotificationscounter$ = new BehaviorSubject(undefined);
  public notifications$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public messagesnotifications$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public globalnotifications$ = new Subject();
  public offlinemessage$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  socketsetup = false;
  messageguard:any

connected=false

  // socket=io(this.ngchatbackend)
  constructor(private ui: UiService,private messageservice:MessagesService,private notification:NotificationsService,
    private router:Router
    ) {

// this.setsocketinstance()

// this.setuid()

  }

  setsocketinstance(){



    if(this.connected)return



    if(this.ui.authuser !== undefined)
    {
      this.socket= io(this.ngchatbackend, {query: {uid: this.ui.authuser._id}});
// this.gloabalnotificationsound().subscribe(()=>this.notification.notificationsound())
this.connected=true
// console.log('socket', this.socket);
this.userlogin()
  }


  }


  disconnectinstance(){
    if(this.socket !=undefined) {
      this.socket.close()
      console.log('socket value after close: ',this.socket)
      this.socket=undefined
      console.log('live socket disconnected');

    }




  }

  userofflinenoification(){

    // if(this.socket ==undefined) return null
    this.socket.on('logoutresponse', (message:any) =>{

      // console.log('emitted logoff message: ',message);

      this.userconnectionstatus$.next(message);
    });

    return this.userconnectionstatus$.asObservable();

  }


  userlogout(){
    this.socket.emit('logout',{message:'user has logged out'},(logout)=>{
      console.log('logout response emission',Response)
      if(logout.loggedout==true){
        this.connected=false
         this.disconnectinstance()
        localStorage.removeItem('token')
        this.router.navigateByUrl('/login')
      }
    })
  }



  useronlinenoification(){

    // if(this.socket ==undefined) return null
    this.socket.on('loginresponse', (message:any) =>{

      //  console.log('emitted login message: ',message);

      this.userconnectionstatus$.next(message);
    });

    return this.userconnectionstatus$.asObservable();

  }
  userlogin(){
    this.socket.emit('login',{message:'user has logged in'})
  }
  // setuid(){


  //   // console.log('current logged in user',this.ui.logedinuser)
  //   return this.socket.emit('userconnect', {  uid: this.ui.logedinuser._id});
  //  }

   sendmessage(messageobj){
    // console.log('from', this.ui.logedinuser);
    // console.log('to', this.ui.chatowner.value);
let resp
    // console.log('message payload',messageobj);
    this.socket.emit('message-sent',messageobj,(response)=>{
      // console.log(response);
      if(response) {
        console.log('message sent ',response);

         this.messageservice.chatthread$.next([...this.messageservice.chatthread$.value,response.sent])

         setTimeout(() => {

           this.ui.scrolltobottom$.next(this.ui.scrolltobottom$.value+1)
         }, 100);
      }

     })




   }

  //  commentnotifcation(postid,userid,actiontype){

  //  const Notificationpayload={
  //     postid,
  //     userid,
  //     action:actiontype

  //   }
  //   this.socket.emit('emitnotification',Notificationpayload)
  //  }

    getNewMessage () {

      // console.log('received online message being hit');
    this.socket.on('message-received', (message) =>{
//  console.log('socket get new message: ',message);

      this.message$.next(message);
    });
    // console.log('currentmessage online chat: ',this.message$.value);

    return this.message$.asObservable();
  }

NewMessageNotification () {

    // console.log('received online message being hit');
  this.socket.on('new-message-notification', (message) =>{
// console.log('socket get new message: ',message);

    this.messagenotifications$.next(message);
  });
// console.log('currentmessage online chat: ',this.message$.value);
  return this.messagenotifications$.asObservable();
}

NewMessageNotificationcounter () {

   console.log('message counter being hit');
this.socket.on('live_message_notification', messagecount =>{
console.log('socket get new message count: ',messagecount);

  this.messagenotificationscounter$.next(messagecount);
});
 console.log('currentmessage online chat: ',this.messagenotificationscounter$.value);
return this.messagenotificationscounter$.asObservable();
}
offlinenewmessage(){

  this.socket.on('receive-offline-message', (message) =>{
    this.offlinemessage$.next(message);
  });

  return this.offlinemessage$.asObservable();

}


homepagenotifications(){
 // console.log('notifications being hit');
  this.socket.on('comment_notification',notification=>{
   // console.log('new comment notification ',notification)
      this.notifications$.next(notification)
  })

  return this.notifications$.asObservable()

}
homepagemessages(){
  // console.log('notifications being hit');
   this.socket.on('live_message_notification',notification=>{
     console.log('new comment notification ',notification)
       this.messagesnotifications$.next(notification)
   })

   return this.messagesnotifications$.asObservable()

 }


gloabalnotificationsound(){

  this.socket.on('global_notification',notification=>{
    // console.log('new comment notification ',notification)
       this.globalnotifications$.next(notification)
   })

   return this.globalnotifications$.asObservable()

}


}
