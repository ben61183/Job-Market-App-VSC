import { Component, OnInit } from '@angular/core';
import { UserIdService } from '../user-id.service';
import { CompanyIdService } from '../company-id.service';
import { MatDialog } from '@angular/material';
import { UserRegisterLoginComponent } from '../user-register-login/user-register-login.component';
import { CompanyRegisterLoginComponent } from '../company-register-login/company-register-login.component';
import { CompanyService } from '../company.service';
import { UserService } from '../user.service';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { UserDatatableComponent } from '../user-datatable/user-datatable.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']  ,
  providers: [UserIdService,CompanyIdService]
})
export class WelcomeComponent implements OnInit {

  // my details to be determined on login
  myUserId:number
  myCompanyId:number
  myUsername:string
  myCompanyName:string

  constructor(public dialog: MatDialog,private uidSer:UserIdService, private cidSer:CompanyIdService,
    private comSer:CompanyService, private useSer:UserService) {
      this.myUserId=uidSer.getUserId()
      this.myCompanyId=cidSer.getCompanyId()
    }

  ngOnInit() {
    this.loadNames()
  }

  // open login for user
  openUser() {
    this.dialog.open(UserRegisterLoginComponent);
  }

  openUserDatatabe() {
    this.dialog.open(UserDatatableComponent);
  }

  // open login for company
  openCompany() {
    this.dialog.open(CompanyRegisterLoginComponent)
  }
  
  // load the name of the company/user logged in for greeting
  loadNames(){
    if(this.myUserId!=-1 && this.myUserId!=1){
      this.useSer.findUserByUserId(this.myUserId).subscribe(response=>this.myUsername=response.username)
      console.log(this.myUsername)
    }
    if(this.myCompanyId!=-1){
      this.comSer.fetchCompanyFromService(this.myCompanyId).subscribe
      (response=>this.myCompanyName=response.companyName)
      console.log(this.myCompanyName)
    }
    console.log("neither loaded")
  }

  // log out user and log in company
  logInCompany(id){
    this.uidSer.changeUserId(-1)
    this.cidSer.changeCompanyId(id)
  }

  // login as admin user
  openAsAdmin(){
    this.dialog.open(AdminLoginComponent)
  }

}
