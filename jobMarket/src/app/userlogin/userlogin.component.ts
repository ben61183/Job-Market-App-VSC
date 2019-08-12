import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  userId:number
  username:string
  password:string

  allUsers=[]

  isLoginValid: boolean
  


  constructor(private usrSvc: RegisterService) { 

    this.userId=1;
    this.username="";
    this.password="";
  }

  ngOnInit() {

  }

  loadAllUsers(){
    this.usrSvc.loadAllUsersFromServer().subscribe(
      response =>
      {this.allUsers=response
       
      })
  }

  credentialCheck(){
    for(let user of this.allUsers){
      if (user.username==this.username && user.password==this.password){

        return this.isLoginValid=true
      } else{
        this.isLoginValid=false
      }
    }

  }

  login(){
    this.credentialCheck()
    if(this.isLoginValid=true){

    }
  }
}
