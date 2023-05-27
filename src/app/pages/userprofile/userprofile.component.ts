import { IOService } from './../../services/io.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  uid=''
  constructor(

    private location: Location,
    private activeroute:ActivatedRoute,
    private io:IOService

  ) {

    this.uid=this.activeroute.snapshot.params['id']
  this.io.setsocketinstance()

   }

  ngOnInit(): void {
  }

  back() {
    this.location.back()
  }

}
