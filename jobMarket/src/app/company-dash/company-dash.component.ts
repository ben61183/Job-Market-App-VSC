import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CompanyComponent } from '../company/company.component';
import { UserIdService } from '../user-id.service';

@Component({
  selector: 'app-company-dash',
  templateUrl: './company-dash.component.html',
  styleUrls: ['./company-dash.component.css']
})
export class CompanyDashComponent implements OnInit {

  myUserId:number

  constructor(public dialog: MatDialog, public uidSvc:UserIdService) { }

  ngOnInit() {
    this.myUserId = this.uidSvc.getUserId()
  }

}
