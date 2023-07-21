import { MessagesService } from './../../services/messages.service';
import { UiService } from './../../services/ui.service';

import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject, Observable, combineLatest, BehaviorSubject } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { chatlist } from 'src/app/interface/messages.interface';
import { IOService } from 'src/app/services/io.service';



@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  Destroy$=new Subject<boolean>()

names=[]
  constructor(public ui:UiService,private messageservice:MessagesService,private io:IOService) {

    // this.names= this.ui.names











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
markmessagesasread(count:number){
  // if(count==0) return this.ui.unreadcounter=0
  // console.log('current message count',count);
 return this.ui.unreadcounter=count

}


}
