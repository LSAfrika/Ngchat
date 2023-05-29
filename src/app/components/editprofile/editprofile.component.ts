import { ApiService } from 'src/app/services/api.service';
import { UiService } from './../../services/ui.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  username=''
  savestate='save'
  initialusername=''
  inactive=true
  updating=false
  status=''
  profilepic='profilepic'
  updateprofileforn:FormData
  updatesub:Subscription
  @ViewChild('messendtosend') messagetosend: any;


  constructor(public ui:UiService,private api:ApiService) {

    this.initialusername=this.ui.authuser.username
    this.username=this.ui.authuser.username
    this.status=this.ui.authuser.status
    this.updateprofileforn= new FormData()
  }

  ngOnInit(): void {
  }
  closeeditprofile(){
    this.ui.editmodal.next(false)
  }

  fileupload(event){
    // console.log(event.target.files[0]);
const pic=event.target.files[0]
this.updateprofileforn.append(this.profilepic,pic)

console.log(this.updateprofileforn.get(this.profilepic));

this.inactive=false


  }

  statusevent(event){
 console.log(event.target);
this.inactive=false
// console.log('form inactive',this.inactive);

  }
  usernameevent(event){
     console.log(event.target.value);
    this.inactive=false
    // console.log('form inactive',this.inactive);

  }

  update(){

    if(this.inactive)return
    this.status = this.messagetosend.nativeElement.innerHTML;

    if(this.status.includes('&amp;nbsp;')){
     const array= this.status.split('&amp;nbsp;')
     console.log(array);

     const rejoinarray=array.join()
     console.log('rejoined array',rejoinarray);

    }

    if(this.status.includes('&nbsp;')){
      const array= this.status.split('&nbsp;')
      console.log(array);

     }
    this.status= this.status.replace('&nbsp;','')||this.status
  //  console.log('trimmed status',status);

  console.log('current status',this.status);
  //  return
    this.updateprofileforn.append('status',this.status)
    this.updateprofileforn.append('username',this.username)

this.updateprofileforn.forEach(val=>console.log('updatefrom values',val))
this.savestate='saving ...'
this.updating=true
 this.updatesub=this.api.updateuserprofile(this.updateprofileforn).subscribe(
  (res:any)=>{

console.log('update response',res);

localStorage.setItem('token',res.token)
localStorage.setItem('refreshtoken',res.refreshtoken)

if(!!localStorage.getItem('token')) this.ui.authuser = JSON.parse(atob(localStorage.getItem('token').split('.')[1]))
console.log('update to user: ',this.ui.authuser);

this.updateprofileforn=new FormData()
this.ui.editmodal.next(false)
this.savestate='save'
this.updating=false


    this.updatesub.unsubscribe()
  },
(err)=>{console.log(err);}
)

  }
}
