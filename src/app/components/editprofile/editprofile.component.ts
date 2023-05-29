import { UiService } from './../../services/ui.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  username=''
  status=''
  profilepic='profilepic'
  updateprofileforn:FormData
  @ViewChild('messendtosend') messagetosend: any;


  constructor(public ui:UiService) {

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


  }

  update(){
    this.status = this.messagetosend.nativeElement.innerHTML;


    this.updateprofileforn.append('status',this.status)
    this.updateprofileforn.append('username',this.username)

this.updateprofileforn.forEach(val=>console.log('updatefrom values',val))

  }
}
