import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.scss']
})
export class ChatpageComponent implements OnInit {

  constructor(public ui:UiService) { }

  ngOnInit(): void {
  }

  closechat(){
    this.ui.close_chat()
  }

}
