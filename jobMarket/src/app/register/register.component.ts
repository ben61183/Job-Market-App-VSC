import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { User } from '../user';
import { UserIdService } from '../user-id.service';
import { CompanyIdService } from '../company-id.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserIdService,CompanyIdService]

})

export class RegisterComponent implements OnInit {

  userId:number
  username:string
  password:string
  email: string
  confirmPassword: string

  isUserFormVisible:boolean
  isPassMatch:boolean
  isError:boolean
  isPassCheck:boolean
  isUsernameCheck: boolean
  isEmailCheck: boolean
  isUniqueEmail: boolean
  isUniqueUsername: boolean

  allUsers: User[];

  myUserId:number

  constructor(private regSvc:RegisterService, private uidSer:UserIdService) {
    this.isPassMatch
    this.isError=true
    this.isEmailCheck
    this.isUniqueEmail=true
    this.isUniqueUsername=true

    this.isPassCheck=false;
    this.isUsernameCheck=false;
    this.isEmailCheck=false;

    this.userId=1;
    this.username="";
    this.password="";
    this.email="";
    this.confirmPassword=""


    this.myUserId=0
    
   }
  
  ngOnInit() {
    this.uidSer.currentUserId.subscribe(myUserId => this.myUserId = myUserId)
  }

  addUserDetails(){
  this.regSvc.updateUserOnServer({userId:this.userId,username:this.username,password:this.password,email:this.email}).subscribe(
    response => {
          this.userId = response.userId
          this.username = response.username
          this.password = response.password
          this.email = response.email
          console.log(response)
          })
  } 
  
  passwordCheck(){
    if (this.confirmPassword==this.password){
          return this.isPassCheck=true;
        } else{
          this.isError=false;
          console.log(this.isError)
        }
  }

  loadAllUsers(){
    this.regSvc.loadAllUsersFromServer().subscribe(
      response =>
      {this.allUsers=response
       
      })
  }



  fetchCurrentUserByUsername(username){
    this.regSvc.findUserByUsername(this.username).subscribe(
  
      response => {
        this.userId=response.userId
        this.username=response.username
        this.password=response.password
        this.email=response.email
      }
    )
  }

  uniqueUsernameCheck(){
      for(let user of this.allUsers){
        if (user.username==this.username){
          console.log("username is matching")
          return this.isUsernameCheck=true
        } else{
          this.isUniqueUsername=false;
        }
        
      }
  }

  uniqueEmailCheck(){
    for(let user of this.allUsers){
      if (user.email==this.email){

        return this.isEmailCheck=true
      } else{
        this.isUniqueEmail=false
      }
      
    }
}


  signUp(){
    this.passwordCheck()
    this.uniqueUsernameCheck()
    this.uniqueEmailCheck()
    if(this.isPassCheck==true && this.isUsernameCheck==true && this.isEmailCheck==true){
      this.addUserDetails();

    }
    
  }

}
