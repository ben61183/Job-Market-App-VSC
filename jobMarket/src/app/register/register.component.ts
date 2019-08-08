import { Component, OnInit } from '@angular/core';

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

  isUserFormVisible:boolean

  constructor() { }
  
  ngOnInit() {
  }

  addUser(username, password, email){
    username=username.value; 
    password=password.value;
    email=email.value;
    console.log('Registering User: addUser');
    console.log(username,password,email);

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



}
