import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private ui:UiService) { }

  names:string[]=[]

  ngOnInit(): void {
    this.names= this.ui.names
  }

  openchat(){
    this.ui.open_chat()
  }
  openbio(){
    this.ui.open_modal()
  }

}
