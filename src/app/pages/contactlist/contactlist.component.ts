import { contacts, userfetch } from '../../interface/user.interfaces';
import { switchMap, map, debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { UserService } from './../../services/user.service';
import { ApiService } from './../../services/api.service';
import { IOService } from './../../services/io.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { of, Subject } from 'rxjs';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.scss']
})
export class ContactlistComponent implements OnInit {

username=''
allcontacts=0
destroy$:Subject<boolean>=new Subject()
personalcontacts=false
@ViewChild('contactslist') private myScrollContainer: ElementRef;

count=this.user.searchvalue.pipe(switchMap((queryvalue:userfetch)=>{

 return this.user.fetchcount(queryvalue.searchtext)
}),map((res:any)=>res.totalusers as number)

)

// usercontactlist=this.user.fetchfavoritecontactlist()
// users=this.user.searchvalue.pipe(
//   debounceTime(500),
//   distinctUntilChanged(),
//   switchMap((queryvalue)=>
//     this.user.fetchallusers(queryvalue.searchtext,queryvalue.pagination)
//   ),
//   map((res:any)=>  {this.allcontacts=res.users.length; return res.users})

//   )
  constructor(public ui:UiService,private io:IOService,private user:UserService) {
  this.io.setsocketinstance()

  console.log('fav contacts initial list',this.ui.personalcontacts.value);

 if(this.ui.personalcontacts.value == undefined) this.user.fetchfavoritecontactlist().pipe(takeUntil(this.destroy$)).subscribe((res:contacts[])=>{console.log(res),this.ui.personalcontacts.next(res)})
  // this.user.searchvalue.subscribe(console.log)
  if(this.ui.allcontacts.value == undefined) this.contactsfetchrequest()

  }

  ngOnInit(): void {


  }

  togglecontacts(){
    this.personalcontacts=!this.personalcontacts
  }

  ngOnDestroy(){
    this.user.searchvalue.next({searchtext:'',pagination:this.user.searchvalue.value.pagination})
    this.destroy$.next(true)
    this.destroy$.complete()
    this.destroy$.unsubscribe()
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

favoriteacontact(index,uid){
  this.ui.loadingspinner$.next(index)

  this.user.addremoveforiteuser(uid).pipe(
    tap((res:{message:string,favcontacts:contacts[]})=>{
      // console.log(res);
      this.ui.personalcontacts.next(res.favcontacts );
      this.contactsfetchrequest()
    }),
    takeUntil(this.destroy$)).subscribe()

}

contactsfetchrequest(){

  this.user.searchvalue.pipe
  (
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((queryvalue)=>
      this.user.fetchallusers(queryvalue.searchtext,queryvalue.pagination)
    ),
    map((res:any)=>  {return res.users}),
     map((contacts:contacts[])=>{

    const contactsuserids=  this.ui.personalcontacts.value.map(user=> user._id)
    // console.log('list of favorite users',contactsuserids);



return contacts.map(contact=>{
  if(contactsuserids.indexOf(contact._id)==-1)contact.favorited=false
  if(contactsuserids.indexOf(contact._id)!=-1)contact.favorited=true

  // console.log(contact)
  return contact

})
      }),
      tap(allcontacts=>{
        this.ui.allcontacts.next(allcontacts)

        this.allcontacts=this.ui.allcontacts.value.length
        // console.log('contacts in all contacts BSubject',this.ui.allcontacts.value);
        this.ui.loadingspinner$.next(-1)

      }),
      takeUntil(this.destroy$)

    ).subscribe()

}
}
