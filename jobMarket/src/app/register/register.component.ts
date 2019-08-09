import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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

  allUsers: User[];

  constructor(private regSvc:RegisterService) {
    this.isPassMatch
    this.isError=true
    this.isPassCheck=false;
    this.isUsernameCheck=false;
    this.isEmailCheck=false;

    this.userId=1;
    this.username="";
    this.password="";
    this.email="";
    this.confirmPassword=""
    
   }
  
  ngOnInit() {
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
        }
        
      }
  }

  uniqueEmailCheck(){
    for(let user of this.allUsers){
      if (user.email==this.email){

        return this.isEmailCheck=true
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
