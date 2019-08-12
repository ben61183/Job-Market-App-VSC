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

  allUsers;

  myUserId:number

  constructor(private regSvc:RegisterService, private uidSer:UserIdService) {
    this.isPassMatch
    this.isError=true
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
    this.myUserId = this.uidSer.getUserId()
    this.loadAllUsers()    
  }

  addUserDetails(){
  this.regSvc.updateUserOnServer({userId:this.userId,username:this.username,password:this.password,email:this.email}).subscribe(
    response => {
          this.userId = response.userId
          this.username = response.username
          this.password = response.password
          this.email = response.email
          this.uidSer.changeUserId(this.userId)
          console.log(response)
          })
  } 
  
  passwordCheck(){
    if (this.confirmPassword==this.password){
          return this.isPassCheck=true;
        } else{
          this.isError=false;
          
        }
  }

  loadAllUsers(){
    this.regSvc.loadAllUsersFromServer().subscribe(
      response =>
      {this.allUsers=response
      console.log(response)
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
      // this.loadAllUsers()
      for(let user of this.allUsers){
        if (user.username!=this.username){
          return this.isUsernameCheck=true
        } else{
          return this.isUniqueUsername=false
          
        }
  }
}


  
  uniqueEmailCheck(){
    // this.loadAllUsers()
    for(let user of this.allUsers){
      if (user.email!=this.email){
        
        return this.isEmailCheck=true
      } else{
        return this.isUniqueEmail=false
        
      }
      
    }
}


  signUp(){
    this.isError=true
    this.isUniqueEmail=true
    this.isUniqueUsername=true
    this.passwordCheck()
    // this.loadAllUsers()
    this.uniqueUsernameCheck()
    this.uniqueEmailCheck()
    if(this.isPassCheck==true && this.isEmailCheck==true && this.isUsernameCheck==true){
      this.addUserDetails();
      window.location.reload();
    }

    
  }

}
