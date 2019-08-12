import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { User } from '../user';
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

  isLoginValid: boolean
  isError: boolean

  allUsers: User[];


  

  myUserId:number

  myCompanyId:number


  constructor(private usrSvc: RegisterService, private uidSer:UserIdService, private cidSer:CompanyIdService) { 

    this.isLoginValid=false;
    this.isError=false;
  

    this.userId=1;
    this.username="";
    this.password="";
  }

  ngOnInit() {
    this.myUserId = this.uidSer.getUserId()
    this.myCompanyId = this.cidSer.getCompanyId()
    this.loadAllUsers()
  }

  loadAllUsers(){
    this.usrSvc.loadAllUsersFromServer().subscribe(
      response =>
      {this.allUsers=response
       console.log(response)
      })
  }

  credentialCheck(){
    for(let user of this.allUsers){
      if (user.username==this.username && user.password==this.password){

        return this.isLoginValid=true
      } else{
        this.isError=true
      }
    }
  }  

  // change user id in uid service, will effect whole application
  logInUser(userId){
    this.cidSer.logOutCompany()
    this.uidSer.changeUserId(userId)
    console.log("userId:"+userId)
  }

  logInCompany(companyId){
    this.uidSer.logOutUser()
    this.cidSer.changeCompanyId(companyId)
    console.log("companyId"+companyId)
  }

  login(){
    this.isError=false
    this.credentialCheck()
    if(this.isLoginValid=true){
      console.log("route to main page")
    } 
  }
}
