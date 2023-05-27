import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public ui:UiService,public api:ApiService,private router:Router) {

    // if(!!localStorage.getItem('token'))router.navigateByUrl('/home')
  }

  ngOnInit(): void {
  }

}
