import { MessagesService } from './../../services/messages.service';
import { UiService } from './../../services/ui.service';

import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject, Observable, combineLatest } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { chatlist } from 'src/app/interface/messages.interface';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  Destroy$=new Subject<boolean>()
  userchats:Observable<chatlist[]>=this.messageservice.fetchchatlist().pipe(map((res:any)=>res.chats as chatlist[]))

names=[]
  constructor(private ui:UiService,private messageservice:MessagesService) {

    this.names= this.ui.names








  }


  getUnique(arr:any, comp:any) {

    // store the comparison  values in array
const unique =  arr.map((e:any) => e[comp])

  // store the indexes of the unique objects
  .map((e:any, i:any, final:any) => final.indexOf(e) === i && i)

  // eliminate the false indexes & return unique objects
 .filter((e:any) => arr[e]).map((e:any) => arr[e]);

return unique;
}

  ngOnInit(): void {


  }

  ngOnDestroy(){

    this.Destroy$.next(true)
    this.Destroy$.complete()

  }
  deletemodal(username:string,chatid:any,index:any){

 console.log(username,chatid,index);


  }



}
