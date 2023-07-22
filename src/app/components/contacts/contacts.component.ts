import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject, switchMap, map, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { userfetch, personalcontacts } from 'src/app/interface/user.interfaces';
import { IOService } from 'src/app/services/io.service';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  username=''
  allcontacts=0
  destroy$:Subject<boolean>=new Subject()
  personalcontacts=true
  @ViewChild('contactslist') private myScrollContainer: ElementRef;

  count=this.user.searchvalue.pipe(switchMap((queryvalue:userfetch)=>{

   return this.user.fetchcount(queryvalue.searchtext)
  }),map((res:any)=>res.totalusers as number)

  )

  // usercontactlist=this.user.fetchfavoritecontactlist()
  users=this.user.searchvalue.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((queryvalue)=>
      this.user.fetchallusers(queryvalue.searchtext,queryvalue.pagination)
    ),
    map((res:any)=>  {this.allcontacts=res.users.length; return res.users})

    )
    constructor(public ui:UiService,private io:IOService,private user:UserService) {
    this.io.setsocketinstance()

    console.log('fav contacts initial list',this.ui.personalcontacts.value);

   if(this.ui.personalcontacts.value == undefined) this.user.fetchfavoritecontactlist().pipe(takeUntil(this.destroy$)).subscribe((res:personalcontacts[])=>{console.log(res),this.ui.personalcontacts.next(res)})
    // this.user.searchvalue.subscribe(console.log)

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
    closecontacts(){
      this.ui.initialposition=2



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
