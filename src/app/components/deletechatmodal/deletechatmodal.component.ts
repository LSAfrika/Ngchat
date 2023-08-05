import { MessagesService } from './../../services/messages.service';
import { UiService } from 'src/app/services/ui.service';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { participant } from 'src/app/interface/messages.interface';

@Component({
  selector: 'app-deletechatmodal',
  templateUrl: './deletechatmodal.component.html',
  styleUrls: ['./deletechatmodal.component.scss']
})
export class DeletechatmodalComponent implements OnInit {

 @Input() chatparticipant:participant
deletechatsub:Subscription
deletenotification=false
deletenotificationstring='deleting thread ...'


  constructor(public ui:UiService,private msgservice:MessagesService) { }

  ngOnInit(): void {
    console.log('chat particiant:',this.chatparticipant);

  }

  closedeletemodal(){
    this.ui.opendeletechatmodal=false
  }


  deletechat(){


    this.deletenotification=true
  this.deletechatsub=this.msgservice.deletechatthread(this.chatparticipant._id).pipe(

    tap(res=>{
      console.log(res);
      this.ui.userchats.value.splice(this.ui.deletechatindex,1)
      if(this.ui.chatingwith._id==this.chatparticipant._id) this.ui.activechat$.next(false)
      // this.ui.chatingwith={_id:'',lastseen:0,online:false,profileimg:'',username:'',status:''}

      this.deletenotificationstring='chat deleted'
      setTimeout(() => {
      this.ui.opendeletechatmodal=false
     this.deletenotificationstring='deleting thread ...'

        this.deletenotification=false
        this.deletechatsub.unsubscribe()
      }, 1500);

    })
  ).subscribe()

    }

}
