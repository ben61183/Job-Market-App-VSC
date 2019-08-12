import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { User } from '../user';
import { UserIdService } from '../user-id.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserIdService]

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
    this.isUniqueEmail=true
    this.isUniqueUsername=true

    this.isPassCheck=false;
    this.isUsernameCheck=true;
    this.isEmailCheck=true;

    this.userId=1;
    this.username="";
    this.password="";
    this.email="";
    this.confirmPassword=""


    this.myUserId=0
    
   }
  
  ngOnInit() {
    this.uidSer.currentUserId.subscribe(myUserId => this.myUserId = myUserId)
    this.loadAllUsers()
  }

  addUserDetails(){
  this.regSvc.updateUserOnServer({userId:this.userId,username:this.username,password:this.password,email:this.email}).subscribe(
    response => {
          this.userId = response.userId
          this.username = response.username
          this.password = response.password
          this.email = response.email
          console.log(response)
          this.uidSer.changeUserId(this.userId)
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
        if (user.username==this.username){
          console.log("username is matching")
          return this.isUsernameCheck=true
        } 
  }
}


  
  uniqueEmailCheck(){
    // this.loadAllUsers()
    for(let user of this.allUsers){
      if (user.email==this.email){
        return this.isEmailCheck=true
      } 
      
    }
}


  signUp(){
    this.passwordCheck()
    // this.loadAllUsers()
    // this.uniqueUsernameCheck()
    this.uniqueEmailCheck()
    if(this.isPassCheck==true && this.isEmailCheck==false &&this.isUsernameCheck==false){
      this.addUserDetails();
      window.location.reload();
    }else{
      this.isUniqueEmail=false
    }
    
  }

}
