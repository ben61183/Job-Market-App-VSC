import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { User } from '../user';


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  userId:number
  username:string
  password:string

  isLoginValid: boolean
  isError: boolean

  allUsers: User[];


  


  constructor(private usrSvc: RegisterService) { 

    this.isLoginValid=false;
    this.isError=false;

    this.userId=1;
    this.username="";
    this.password="";
  }

  ngOnInit() {

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

  login(){
    this.isError=false
    this.credentialCheck()
    if(this.isLoginValid=true){
      console.log("route to main page")
    } 
  }
}
