import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserIdService } from '../user-id.service';
import { CompanyIdService } from '../company-id.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']  ,
  providers: [UserIdService,CompanyIdService]

})
export class UserloginComponent implements OnInit {

  userId:number
  username:string
  password:string
  

  myUserId:number

  myCompanyId:number


  constructor(private usrSvc: UserService, private uidSer:UserIdService, private cidSer:CompanyIdService) { 

    this.userId=1;
    this.username="";
    this.password="";
  }

  ngOnInit() {
    this.uidSer.currentUserId.subscribe(myUserId => this.myUserId = myUserId)
    this.cidSer.currentCompanyId.subscribe(myCompanyId => this.myCompanyId = myCompanyId)

  }

  logInUser(userId){
    // change user id in uid service, will effect whole application
    this.uidSer.changeUserId(userId)
    console.log(userId)
  }

  logInCompany(companyId){
    this.cidSer.changeCompanyId(companyId)
  }

}
