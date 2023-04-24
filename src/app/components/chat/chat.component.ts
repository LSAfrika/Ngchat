import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
 
  constructor(public ui:UiService) { }

  names:string[]=[]

  ngOnInit(): void {
    this.names= this.ui.names
  }

  openchat(val:string){
    this.ui.open_chat()
    this.ui.usernameval=val
  }
  openbio(){
    this.ui.open_modal()
  }

  

}
