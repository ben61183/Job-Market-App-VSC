import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { User } from '../user';
import { UserIdService } from '../user-id.service';
import { CompanyIdService } from '../company-id.service';
import { isError } from 'util';


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
  isErrorShort:boolean
  isUserErrorShort: boolean
  isEmailError:boolean

  allUsers:User[];

  myUserId:number


  constructor(private regSvc:RegisterService, private uidSer:UserIdService) {
    this.isPassMatch
    this.isError=null
    this.isUniqueEmail=null
    this.isUniqueUsername=null;
    this.isErrorShort=null
    this.isUserErrorShort=null
    this.isEmailError=null

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
  
   //load all users in list
  ngOnInit() {
    this.loadAllUsers()    
    console.log(this.allUsers)
  }

  //add user details to db
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
  
  //check password and confirm password match
  passwordCheck(){
    if (this.confirmPassword==this.password){
         this.isError=false;
        } else if(this.isError==null){
          this.isError=true;
          
        }
  }

  //check password length
  passLengthCheck(){
    if (this.password.length <6){
      this.isErrorShort=true

    } else if(this.isErrorShort==null){
      this.isErrorShort=false
    }
  }

  //load list of all users
  loadAllUsers(){
    this.regSvc.loadAllUsersFromServer().subscribe(
      response =>
      {this.allUsers=response
      console.log("users:"+response)
      })
  }



  //get user by username
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

  //check username does not match others in database
  uniqueUsernameCheck(){
      // this.loadAllUsers()
      console.log(this.allUsers.length)
      for(let user of this.allUsers){
        console.log(user)
        if (user.username==this.username){
        //  this.isUsernameCheck=false
         this.isUniqueUsername=false
        } else if(this.isUniqueUsername==null){
         this.isUniqueUsername=true
          
        }
  }
}

//username length check
  usernameLengthCheck(){
    if (this.username.length <8){
      this.isUserErrorShort=true;
    } else{
      this.isUserErrorShort=false
    }
  }
  
  //check email doesn't match others in database
  uniqueEmailCheck(){
    // this.loadAllUsers()
    for(let user of this.allUsers){
      if (user.email==this.email){
        
      //  this.isEmailCheck=true
      this.isUniqueEmail=false
      } else if(this.isUniqueEmail==null){
       this.isUniqueEmail=true
        
      }
      
    }
}

//check email contains '@' for some validity
  checkEmailIsValid(){
    if(this.email.includes("@")==true){
      console.log(this.email.includes("@"))
      this.isEmailError=false
    }else if(this.isEmailError==null){
      this.isEmailError=true
    }
  }

//check validities and then register new user
  signUp(){
   this.isErrorShort=null
    this.isError=null
    this.isUserErrorShort=null
    this.isUniqueEmail=null
    this.isEmailError=null
    this.isUniqueUsername=null
    this.passwordCheck()
    this.passLengthCheck()
    // this.loadAllUsers()
    this.uniqueUsernameCheck()
    this.usernameLengthCheck()
    this.uniqueEmailCheck()
    this.checkEmailIsValid()
    if(this.isUniqueEmail==true && this.isUniqueUsername==true && this.isEmailError==false
      && this.isErrorShort==false && this.isError==false && this.isUserErrorShort==false){
      this.addUserDetails();
      window.location.reload();
    }
    
  }

}
