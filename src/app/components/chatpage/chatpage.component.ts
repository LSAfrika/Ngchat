import { MessagesService } from './../../services/messages.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.scss']
})
export class ChatpageComponent implements OnInit {

  @ViewChild('chatview') private myScrollContainer: ElementRef;

  constructor(public ui:UiService,public msgservice:MessagesService) { }

  ngOnInit(): void {

    this.ui.desktopchatscrolltobotton().pipe(delay(100)).subscribe(res=>{
      console.log('current res',res);
      this.scrollToBottom()
    })
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

}
