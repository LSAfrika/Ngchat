import { takeUntil } from 'rxjs/operators';
import { MessagesService } from './../../services/messages.service';
import { IOService } from './../../services/io.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';
import { chatlist } from 'src/app/interface/messages.interface';
import { map, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  destroy$= new Subject()




  constructor(public api:ApiService,public ui:UiService,private io:IOService) {

     this.io.setsocketinstance()


  }

  ngOnInit(): void {


    // this.messageservice.fetchchatlist().pipe(map((res:any)=>res.chats as chatlist)).subscribe((res:chatlist)=>console.log('user\'s chat',res))
  }

  ngOnDestroy(){
    this.destroy$.next(1)
    this.destroy$.complete()
    this.destroy$.unsubscribe()

  }

  openlist(){
    this.ui.userlist=1
    console.log('ui modal',this.ui.userlist);

  }

}
