import { Message } from './../interface/messages.interface';
import { BehaviorSubject, map, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messagepagination=0
  chatthread$ :BehaviorSubject<Message[]>=new BehaviorSubject([])

chatid=''
  userchatlist$=new BehaviorSubject<any>([])
unreadcounter=0
  userchat$=new BehaviorSubject<any>([])
  indexdelete=0

  ROOTMESSAGEURL=environment.API+'messages/'
  ROOTCHATSURL=environment.API+'chat/'

  constructor(private http:HttpClient) { }



  fetchthread(userid){

 return this.fetchchat(userid).pipe(
    map((res:Message[])=>{console.log('msg service thread',res);
    return res }),
    // tap(res=>this.chatthread$.next(res))
    )
    // .subscribe()
  }


  fetchchat(user:string){

    return this.http.get(this.ROOTCHATSURL+'singlechat/'+`${user}/`+'?pagination='+this.messagepagination)
  }

  deletechatthread(chatparticipant):Observable<{message:string}>{
    return this.http.delete<{message:string}>(this.ROOTCHATSURL+'singlechat/'+chatparticipant)
  }

  fetchchatlist(){
    return this.http.get(this.ROOTCHATSURL+'allchats')
  }

  fetchsunreadmessages(){
return this.http.get(this.ROOTMESSAGEURL+'unreadmessagescounter/')
  }


  deletechat(chatid){

    console.log('chat id to delete ',chatid);
    return this.http.delete(this.ROOTMESSAGEURL+`deletemessage/${chatid}`)

  }

  unreadcounterreset(chatid){
 return this.http.get(this.ROOTCHATSURL+'unreadcounterreset/'+`${chatid}`)
}

}
