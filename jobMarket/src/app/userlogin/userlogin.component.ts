import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { User } from '../user';
import { UserIdService } from '../user-id.service';
import { CompanyIdService } from '../company-id.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CompanyService } from '../company.service';


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
  myUsername:string

  myCompanyId:number
  myCompanyName:string

  constructor(private usrSvc: RegisterService, private uidSer:UserIdService, private cidSer:CompanyIdService,
    private router:Router, private useSer:UserService, private comSer:CompanyService) { 

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
        this.userId=user.userId
        console.log(this.userId)
        this.isLoginValid=true
      } else{
        this.isError=true
      
      }
    }
  }  

  // change user id in uid service, will effect whole application
  logInUser(){
    // this.isError=false
    this.credentialCheck()
    if(this.isLoginValid==true){
      this.cidSer.logOutCompany()
      this.uidSer.changeUserId(this.userId)
      console.log("logged in as userId:"+this.userId)
      this.useSer.findUserByUserId(this.userId).subscribe(response=>{this.myUsername=response.username, console.log("username:"+this.myUsername)})
      window.location.reload()
    }
  }

  logInCompany(companyId){
    this.uidSer.logOutUser()
    this.cidSer.changeCompanyId(companyId)
    console.log("companyId"+companyId)
    
  }

}
