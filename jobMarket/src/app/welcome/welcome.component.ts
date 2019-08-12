import { Component, OnInit } from '@angular/core';
import { UserIdService } from '../user-id.service';
import { CompanyIdService } from '../company-id.service';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { UserRegisterLoginComponent } from '../user-register-login/user-register-login.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']  ,
  providers: [UserIdService,CompanyIdService]
})
export class WelcomeComponent implements OnInit {

  myUserId:number
  myCompanyId:number
  constructor(public dialog: MatDialog,private uidSer:UserIdService, private cidSer:CompanyIdService) { }

  ngOnInit() {  
    this.uidSer.currentUserId.subscribe(myUserId => this.myUserId = myUserId)
    this.cidSer.currentCompanyId.subscribe(myCompanyId=>this.myCompanyId=myCompanyId)
  }

  openUser  () {
    this.dialog.open(UserRegisterLoginComponent);
  }
}
