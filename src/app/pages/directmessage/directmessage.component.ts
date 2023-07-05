import { UserService } from './../../services/user.service';
import { User } from './../../interface/post.interface';
import { Usermessages,Message } from './../../interface/messages.interface';
import { MessagesService } from './../../services/messages.service';
// import { PostService } from './../../services/Post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { IOService } from '../../services/io.service';
import { BehaviorSubject, Subject, Observable, from, of } from 'rxjs';
import { takeUntil, tap, switchMap, map, skip } from 'rxjs/operators';
import { Location } from '@angular/common'

@Component({
  selector: 'app-directmessage',
  templateUrl: './directmessage.component.html',
  styleUrls: ['./directmessage.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DirectmessageComponent implements OnInit {

  // @ViewChild('chatview') thread: ElementRef;
  @ViewChild('messendtosend') messagetosend: any;


  // destroy$=new Subject<boolean>()
  numberOfLineBreaks = 0;
items = [1, 1, 1, 1, 1];


textareaheight = 2;
loadingchat=false
chatparticipantid = '';
message = '';
chatid=''
DirectChat:Message[]=[]
destroy$ = new Subject<boolean>();
user:Subject<User>=new Subject()
@ViewChild('chatview') private myScrollContainer: ElementRef;
elementchecked=true

constructor(public ui: UiService, private router: Router,
            private io: IOService, private route: ActivatedRoute,
            private userservice:UserService,
            // private postservice: PostService,
            private location: Location,
            public msgservice: MessagesService
    ) {

  this.chatparticipantid = this.route.snapshot.params['id']
if(this.ui.authuser._id==this.chatparticipantid) { this.back();return}
  this.io.setsocketinstance()


this.fetchuser()
 this.userofflinenotification()
 this.useronlinenotification()
 this.updateview()
this.fetchcurrentchat()
this.readcounterreset()

  // console.log('unread messages: ',this.msgservice.unreadcounter);

  // console.log('chat owner ',this.ui.chatowner.value );

  // if (this.ui.chatowner.value === undefined) { this.fetchchatmessagesinitial(); }


  // if (this.ui.chatowner.value !== undefined && this.ui.chatowner.value._id !== this.chatparticipantid) { this.chatownerchangefetchmessages(); }

//  this.io.getNewMessage().pipe(takeUntil(this.destroy$),
//  tap(res=>{
//   console.log('offline socket',res);
//  if(res===undefined)return
//  if(res.from!==this.chatparticipantid)return
//  if(res=== this.io.messageguard)return console.log('same message socket emission');

//  this.msgservice.userchat$.next([...this.msgservice.userchat$.value,res])

//  this.io.messageguard=res
//  this.resetunreadcounter()

// }))
//  .subscribe()




  // this.io.offlinenewmessage().pipe(takeUntil(this.destroy$), tap((res: any) => {
  //   console.log('offline response:',res);
  //   if(res===undefined) return
  //   // console.log('offline vaue on reset',this.msgservice.userchat$.value);

  //   if (this.msgservice.userchat$.value[0]!==undefined&&this.msgservice.userchat$.value.length>0&&this.msgservice.userchat$.value[this.msgservice.userchat$.value.length - 1].message === res.message){ return}
  //   const newmessagesareray: any = [...this.msgservice.userchat$.value, res];
  //   // console.log('messages array:', newmessagesareray);

  //   this.msgservice.userchat$.next(newmessagesareray);
  // })).subscribe();

// this.chatthread$.subscribe(console.log)


}

readcounterreset(){
  console.log('current unread count:\n',this.ui.unreadcounter);
  if(this.ui.unreadcounter>0){
    this.msgservice.unreadcounterreset(this.chatparticipantid).pipe(takeUntil(this.destroy$)).subscribe(
      res=>console.log(res),
      error=>console.log(error)
      )
  }

}


fetchcurrentchat(){
  this.msgservice.fetchthread(this.chatparticipantid).pipe(tap(res=>this.msgservice.chatthread$.next(res)),takeUntil(this.destroy$)).subscribe(
    ()=>{

   console.log('thread',this.DirectChat);

    }
   )

}
fetchuser(){
 this.userservice.fetchuser(this.chatparticipantid).pipe(map((res:any)=> {  return res.user as User}),tap(res=>{console.log(res),this.user.next(res)})).subscribe()


}
userofflinenotification(){
  this.io.userofflinenoification().pipe(
  tap(
    (useroffline:any)=>{
//{message:string,user:User,errormessage?:string}
      // if(useroffline == undefined){ return console.log('initial emit logout')}
      console.log('current user log out',useroffline.user);
const user=useroffline.user

const returneduser={_id:user._id,profileimg:user.profileimg,username:user.username,online:user.online,lastseen:user.lastseen} as User
       this.user.next(returneduser)
  //   },(error)=>{
  // console.log('offline error: ',error.message);

  //
   }

  ),takeUntil(this.destroy$))
  .subscribe( )

}
useronlinenotification(){

  this.io.useronlinenoification().pipe(takeUntil(this.destroy$),
  tap(
    (useronline:any)=>{
//{message:string,user:User,errormessage?:string}
      // if(useronline == undefined){ return console.log('initial emit logout')}
      console.log('current user log in',useronline.user);
const user=useronline.user

const returneduser={_id:user._id,profileimg:user.profileimg,username:user.username,online:user.online,lastseen:user.lastseen} as User
       this.user.next(returneduser)
  //   },(error)=>{
  // console.log('offline error: ',error.message);

  //
   }

  ))
  .subscribe( )

}
  ngOnInit(): void {
  // this.resetunreadcounter()
this.io.getNewMessage().pipe(takeUntil(this.destroy$)).subscribe(
  (res:Message)=>{
    // console.log('user chat emission: ',res)
    // console.log(' chat emission id: ',res)
    // console.log('previous chat emission id: ',this.ui.samechatid)

  if(res ==undefined) return
  if(res._id== this.ui.samechatid) return

    this.msgservice.chatthread$.next([...this.msgservice.chatthread$.value,res])

  setTimeout(() => {
    this.ui.samechatid=res._id

     this.scrollToBottom()
  }, 100);


})

  }

  back() {
    this.location.back()
  }

  ngAfterViewInit(){
    // console.log('afterview init')
    console.log('afterview init',this.myScrollContainer)
    // this.scrollToBottom()//
    // setTimeout(() => {

    //   this.scrollToBottom()
    //   // this.updateview()

    // }, 1000);

  }

  ngAfterViewChecked(){

    // console.log('view is checking');

    if(this.elementchecked){

      console.log('checking');
      console.log('afterview checked init',this.myScrollContainer)
      this.scrollToBottom()
      this.elementchecked=false
    }
    //  console.log('checking');


  }
  ngOnDestroy(): void {
this.msgservice.chatthread$= new BehaviorSubject(undefined)
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }




// resetunreadcounter(){
//   if(this.msgservice.unreadcounter==0 || this.msgservice.chatid=='')return
//   console.log('unread messages: ',this.msgservice.unreadcounter);

//   this.msgservice.resetunreadcounter(this.msgservice.chatid).pipe(takeUntil(this.destroy$)).subscribe((res:any)=>{
//     if(res.message=='success'){
// console.log('reset all unread messages');

//     }
//   })


// }
// chatownerchangefetchmessages(){
//     this.msgservice.userchat$.next([])
//     this.postservice.user(this.chatparticipantid)
//         .pipe(takeUntil(this.destroy$),
//         map((res: any) => {this.ui.chatowner.next(res.user); return res.user._id;}),
//         switchMap((chatparticipantid: any) => this.msgservice.fetchchat(chatparticipantid)),
//         tap((chat: any) => {;this.msgservice.userchat$.next(chat.chat.reverse());
//           //  console.log('fetched user chat', this.msgservice.userchat$.value);

//           })

//         ).subscribe();

//   }

  // fetchchatmessagesinitial(){
  //   this.postservice.user(this.chatparticipantid)
  //   .pipe(
  //     takeUntil(this.destroy$),
  //     map((res: any) => {
  //       // console.log('chating with: ',res)
  //       ;this.ui.chatowner.next(res.user); return res.user._id;}),
  //     switchMap((chatparticipantid: any) => this.msgservice.fetchchat(chatparticipantid)),
  //     tap((chat: any) => {const correctchatflow=[...chat.chat]; this.msgservice.userchat$.next(chat.chat);


  //     })).
  //     subscribe();
  // }

  // closemessage(){
  //   this.ui.directmessagepanel.next(2);
  //   this.router.navigate(['messages']);


  // }



  // backtoprofile(){
  //   this.router.navigateByUrl(`profile/${this.ui.postowner.value._id}`);
  // }

  sendmessage(){

    // console.log(this.messagetosend.nativeElement.innerHTML);

    this.message = this.messagetosend.nativeElement.innerHTML;

    // console.log(this.message);
    if (this.message.trim() == '') { return alert('please input a chat message') }

    const trimmessage1=  this.message.match(/&nbsp;/)
    const trimmessage2=  this.message.match(/&amp;/)
    // console.log('trimmed message payload',trimmessage1);


    if(this.message.includes('&nbsp;')){

     const messagesplit= this.message.split('&nbsp;')
     console.log('text includes nbsp: before',messagesplit);

let message=''
     messagesplit.forEach(word=>{
    if(word.trim() !=''){
      // console.log(' word');
      message=message+' ' +word
      console.log('new sentence',message);

    }

     })
      console.log('text includes nbsp:',messagesplit);
      // console.log('rejoined array',rejoinmessage);

    }

    if(trimmessage1!=null ){
     const messagetosave=this.message.replace('&nbsp;','')
    //  console.log('message to save db nbsp',messagetosave);
     this.message=messagetosave
    //  message=messagetosave
    }

    if(trimmessage2!=null ){
      const messagetosave=this.message.replace('&amp;','')
      console.log('message to save db amp',messagetosave);
      this.message=messagetosave
     //  message=messagetosave
     }


    const sentmessagepayload:Message={
      message:this.message,
      from:this.ui.authuser._id,
      to:this.chatparticipantid,
      viewed:false
    }
    this.io.sendmessage(sentmessagepayload);
   console.log(this.io.sent);

    this.message = this.messagetosend.nativeElement.innerHTML = '';

  }

  updateview(){
    this.ui.scrolltobottom$.pipe(takeUntil(this.destroy$)).subscribe(res=>{
       console.log(res);//
     this.scrollToBottom()

     })
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
         console.log('scrolling to bottrom');

    } catch (err) {
      console.log(err.message);

     }
}
}
function to(returneduser: User): Observable<User> {
  throw new Error('Function not implemented.');
}

