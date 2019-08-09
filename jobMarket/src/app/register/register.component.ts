import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
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

  myUserId:number

  constructor(private regSvc:RegisterService, private uidSer:UserIdService) {
    this.isPassMatch
    this.isError=true

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
          this.uidSer.changeUserId(this.userId)
          })
  } 
  
  signUp(){
    if (this.confirmPassword==this.password){
      this.addUserDetails();
      // window.location.reload()
    } else{
      this.isError=false;
      console.log(this.isError)
    }
    
  }

        

  // addUser(username, password, email){
  //   username=username.value; 
  //   password=password.value;
  //   email=email.value;
  //   console.log('Registering User: addUser');
  //   console.log(username,password,email);

    // if(username.length<2){
    //   this.isUserFormValid=false;
    //   this.invalidFormMessage='Product Name must be greater than 2 characters';
    // } else{
    //   this.userSvc.registerUser(username,password,email)
    //    .subsribe
    //    (response => {
    //      console.log('registered user')
    //    });
       
    //    this.isUserFormValid=true;
    //    this.invalidFormMessage="";
    // }

}
