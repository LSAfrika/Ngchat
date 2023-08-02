import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { participant } from 'src/app/interface/messages.interface';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.scss']
})
export class ViewprofileComponent implements OnInit {


  status=''
  username=''
  updateprofileform:FormData
  profilepic='profilepic'
  updatestate='update profile'
  updatesub:Subscription



  constructor(public ui:UiService,private api:ApiService) {


    this.profilepagetestdata()
    this.updateprofileform= new FormData()


  }

  ngOnInit(): void {
  this.status=this.ui.chatingwith.status
  this.username=this.ui.chatingwith.username
  }

  profilepagetestdata(){
    const userprofile:participant={
      _id:this.ui.authuser._id,username:this.ui.authuser.username,profileimg:this.ui.authuser.profileimg,lastseen:0,online:true,status:this.ui.authuser.status
      }
      this.ui.chatingwith=userprofile
  }

  updateprofile(){

    if(this.username.trim()==''||this.status.trim()=='') {alert('no empty field allowed'); return}
    if(this.username.trim().length<5) {alert('username must be min of 5 char'); return}
    if(this.status.trim().length<20) {alert('status must be min of 20 char'); return}
    // let updatepayload={
    //   username:this.username,
    //   status:this.status
    // }
    // console.log('profile update data',updatepayload);

    this.updateprofileform.append('status',this.status)
    this.updateprofileform.append('username',this.username)

    // this.updateprofileform.forEach(tag=>console.log(tag));

    this.updatestate='updating ...'

    this.updatesub=this.api.updateuserprofile(this.updateprofileform).subscribe(
      (res:any)=>{

    console.log('update response',res);

    localStorage.setItem('token',res.token)
    localStorage.setItem('refreshtoken',res.refreshtoken)

    if(!!localStorage.getItem('token')) this.ui.authuser = JSON.parse(atob(localStorage.getItem('token').split('.')[1]))
    console.log('update to user: ',this.ui.authuser);
let updateimage=this.ui.authuser.profileimg
    this.ui.chatingwith.profileimg='http://localhost:3000/default/profile.png'
    this.ui.authuser.profileimg='http://localhost:3000/default/profile.png'

    setTimeout(() => {

      this.ui.chatingwith.profileimg=this.ui.authuser.profileimg=updateimage
      console.log(' chating with model: ',this.ui.chatingwith);

          this.updateprofileform=new FormData()

          this.updatestate='update profile'



              this.updatesub.unsubscribe()
    }, 100);
      },
    (err)=>{console.log('profile update error desktop',err);}
    )


}
closeprofile(){

  this.ui.viewprofile$.next(false)


}

uploadfile(event){
  const pic=event.target.files[0]
  this.updateprofileform.append(this.profilepic,pic)

  console.log(this.updateprofileform.get(this.profilepic));

}

// get uid(){
//   return uid
// }




}
