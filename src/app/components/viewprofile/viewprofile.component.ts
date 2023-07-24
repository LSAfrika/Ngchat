import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.scss']
})
export class ViewprofileComponent implements OnInit {

  constructor(public ui:UiService) { }

  ngOnInit(): void {
  }
closeprofile(){

  this.ui.viewprofile$.next(false)

}
}
