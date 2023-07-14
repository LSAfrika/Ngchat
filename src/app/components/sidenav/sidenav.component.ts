import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public ui:UiService) { }

  tab=1
  chatss=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  names=[]
  ngOnInit(): void {
    this.tab=this.ui.tab
    // this.names= this.ui.names
    this.ui.usernameval=this.names[0]
  }

  chats(){
    this.ui.tab=1;
    this.tab=this.ui.tab

  }
  contacts(){
    this.ui.tab=2
    this.tab=this.ui.tab

  }
  switchchat(name:string){
    this.ui.usernameval=name
  }

  openbio(val:string){
    this.ui.usernameval=val

    this.ui.open_modal()
  }

  openchat(i?:number){

    if(i){

      this.ui.selecteduser=i
    }
    this.ui.open_chat()
  }
  openmodal(){
    this.ui.open_modal()
  }
}
