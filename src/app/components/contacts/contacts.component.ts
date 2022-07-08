import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
 

  constructor(public ui:UiService) { }

  ngOnInit(): void {
  }

  openchat(i:number){
    if(i){
      this.ui.selecteduser=i
    }
    this.ui.open_chat()
  }

}
