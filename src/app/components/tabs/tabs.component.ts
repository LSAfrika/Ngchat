import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  tab=1
  constructor(private ui:UiService) { 
    this.tab= this.ui.tab
  }

  
  ngOnInit(): void {
  }

  switchtab(t:number){
  this.tab= this.ui.tab=t
  // console.log(this.tab);
  
    
  }

}
