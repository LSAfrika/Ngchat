import { map, Observable } from 'rxjs';
import { UserService } from './../../services/user.service';
import { UiService } from './../../services/ui.service';
import { IOService } from './../../services/io.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  uid=''

  currentuser:Observable<any>
  constructor(

    private location: Location,
    private activeroute:ActivatedRoute,
    private io:IOService,
    public ui:UiService,
    private user:UserService,
    private router:Router

  ) {

    this.uid=this.activeroute.snapshot.params['id']
  this.io.setsocketinstance()

  this.currentuser=this.user.fetchuser(this.uid).pipe(map((res:any)=>{return res.user}))
   }

  ngOnInit(): void {
  }

  // ngAfterContentChecked(): void{
  //   console.log('content checked');

  // }

  back() {
    this.location.back()
  }

  openeditprofile(){
    this.ui.editmodal.next(true)
  }


  logout(){

   this.io.userlogout()
  }
}
