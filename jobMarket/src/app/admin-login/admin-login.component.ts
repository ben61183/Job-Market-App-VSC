import { Component, OnInit } from '@angular/core';
import { CompanyIdService } from '../company-id.service';
import { UserIdService } from '../user-id.service';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  adminPassword:string
  inputPassword:string
  isLoginValid: boolean 
  noError: boolean 
  badCountLeft:number
  adminUser:User

  constructor(private cidSer:CompanyIdService, private uidSer:UserIdService,private useSvc:UserService) {
    this.isLoginValid=null
    this.badCountLeft=2
    this.inputPassword=null
  }

  ngOnInit() {
      localStorage.setItem("lockOut","false")
    }  

  //login for company
  adminLogIn() {
    console.log("admin login")
    this.useSvc.findUserByUserId(0).subscribe(response=>{
      this.adminUser=response, 
      this.adminPassword=response.password
      this.checkCredentials() 
      if(this.isLoginValid==true) {
        console.log("Company ID saved locally")
        this.cidSer.logOutCompany()
        this.uidSer.logInAdmin()
        window.location.reload()
      } 
    })
    
  }

  checkCredentials() {
    // check passwords match, badCOunt not zero
    if(this.inputPassword==this.adminPassword && this.badCountLeft>0){
      console.log("passed")
      this.isLoginValid=true
      localStorage.setItem("lockOut","false")
    } else if(this.badCountLeft<=0){
      localStorage.setItem("lockOut","true")
    } else{
      this.badCountLeft-=1
      this.isLoginValid=false
    }
  }
}
