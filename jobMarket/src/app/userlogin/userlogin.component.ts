import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  userId:number
  username:string
  password:string
  


  constructor(private usrSvc: UserService) { 

    this.userId=1;
    this.username="";
    this.password="";
  }

  ngOnInit() {

  }


}
