import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngchat';

  constructor(public ui:UiService,public api:ApiService){
    this.api.initialresponse().subscribe(res=>console.log('server response: ',res))

  }


}
