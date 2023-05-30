import { switchMap,map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from './../../services/user.service';
import { ApiService } from './../../services/api.service';
import { IOService } from './../../services/io.service';
import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.scss']
})
export class ContactlistComponent implements OnInit {

username=''

users=this.user.searchvalue.pipe(
  debounceTime(500),
  distinctUntilChanged(),
  switchMap((searchword:string)=>
    this.user.fetchusers(searchword)
  ),
  map((res:any)=>  res.users)

  )
  constructor(public ui:UiService,private io:IOService,private user:UserService) {
  this.io.setsocketinstance()

  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.user.searchvalue.next('')
  }

  searchvalue(event){
    this.user.searchvalue.next(event.target.value)
    console.log(this.user.searchvalue.value);

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

}
