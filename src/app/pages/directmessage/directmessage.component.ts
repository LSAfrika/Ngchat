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

  this.io.useronlinenoification().pipe(
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

  ),takeUntil(this.destroy$))
  .subscribe( )

}
  ngOnInit(): void {

this.io.getNewMessage().pipe(takeUntil(this.destroy$)).subscribe(
  (res:Message)=>{
     console.log('user chat emission: ',res)
    // console.log(' chat emission id: ',res)


  if(res ==undefined) return
  if(res._id== this.ui.samechatid) return console.log('last chat emission')

    this.msgservice.chatthread$.next([...this.msgservice.chatthread$.value,res])
    this.ui.samechatid=res._id

  setTimeout(() => {

     this.scrollToBottom()
  }, 100);


})

  }

  back() {
    this.location.back()
  }

  ngAfterViewInit(){
     console.log('afterview init')
    // this.scrollToBottom()//
    setTimeout(() => {
      console.log('afterview init',this.myScrollContainer)

      this.scrollToBottom()
      // this.updateview()

    }, 1000);

  }

  ngAfterViewChecked(){

    if(this.myScrollContainer !=undefined) return
     console.log('view is checking');


      console.log('checking');
      console.log('afterview checked init',this.myScrollContainer)
      this.scrollToBottom()


    //  console.log('checking');


  }
  ngOnDestroy(): void {
this.msgservice.chatthread$= new BehaviorSubject(undefined)
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }









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

