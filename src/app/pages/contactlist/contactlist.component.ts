import { userfetch } from './../../interface/userfetch.interface';
import { switchMap,map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from './../../services/user.service';
import { ApiService } from './../../services/api.service';
import { IOService } from './../../services/io.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.scss']
})
export class ContactlistComponent implements OnInit {

username=''
allcontacts=0
@ViewChild('contactslist') private myScrollContainer: ElementRef;

count=this.user.searchvalue.pipe(switchMap((queryvalue:userfetch)=>{

 return this.user.fetchcount(queryvalue.searchtext)
}),map((res:any)=>res.totalusers as number)

)


users=this.user.searchvalue.pipe(
  debounceTime(500),
  distinctUntilChanged(),
  switchMap((queryvalue)=>
    this.user.fetchusers(queryvalue.searchtext,queryvalue.pagination)
  ),
  map((res:any)=>  {this.allcontacts=res.users.length; return res.users})

  )
  constructor(public ui:UiService,private io:IOService,private user:UserService) {
  this.io.setsocketinstance()

  // this.user.searchvalue.subscribe(console.log)

  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.user.searchvalue.next({searchtext:'',pagination:this.user.searchvalue.value.pagination})
  }

  searchvalue(event){
    this.user.searchvalue.next({searchtext:event.target.value,pagination:1})
    // console.log(this.user.searchvalue.value);

  }

  openchat(i:number){
    if(i){
      this.ui.selecteduser=i
    }
    this.ui.open_chat()
  }

openaddcontactmodal(){
  this.ui.contactmodal.next(true)
}

closecontactmodal(){
  this.ui.contactmodal.next(false)

}
  closelist(){
    this.ui.userlist=2

    console.log('ui modal',this.ui.userlist);
    setTimeout(() => {
    this.ui.userlist=0

    }, 1500);

  }
  fetchmoreusers(){
    this.user.searchvalue.next({searchtext:this.user.searchvalue.value.searchtext,pagination:this.user.searchvalue.value.pagination+1})
    this.scrollToBottom()
  }

  identify(index, item){
    return item._id;
 }

 scrollToBottom(): void {
  try {
      this.myScrollContainer.nativeElement.scrollToBottom = this.myScrollContainer.nativeElement.scrollHeight;
      console.log('scroll being called value:',this.myScrollContainer.nativeElement.scrollHeight);

  } catch (err) {
    console.log(err.message);

   }
}
}
