import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  shrinknav='lg:w-[25%]'
  constructor(public ui:UiService) { }



  ngOnInit(): void {
  }

}
