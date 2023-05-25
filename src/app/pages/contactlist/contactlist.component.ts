import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.scss']
})
export class ContactlistComponent implements OnInit {

term=''
  constructor(public ui:UiService) { }

  ngOnInit(): void {
  }

  openchat(i:number){
    if(i){
      this.ui.selecteduser=i
    }
    this.ui.open_chat()
  }


  closelist(){
    this.ui.userlist=2

    console.log('ui modal',this.ui.userlist);
    setTimeout(() => {
    this.ui.userlist=0

    }, 1500);

  }

}
