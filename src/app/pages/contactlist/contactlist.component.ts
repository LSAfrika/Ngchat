import { IOService } from './../../services/io.service';
import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.scss']
})
export class ContactlistComponent implements OnInit {

term=''
  constructor(public ui:UiService,private io:IOService) {
  this.io.setsocketinstance()

  }

  ngOnInit(): void {
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
