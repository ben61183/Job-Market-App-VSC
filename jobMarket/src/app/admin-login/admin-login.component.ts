import { Component, OnInit } from '@angular/core';
import { CompanyIdService } from '../company-id.service';
import { UserIdService } from '../user-id.service';

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

  constructor(private cidSer:CompanyIdService, private uidSer:UserIdService) {
    this.adminPassword="4dmin!0Ytas182%e"
    this.isLoginValid=null
    this.badCountLeft=2
    this.inputPassword=null
  }

  ngOnInit() {
    // check lockoutdate against todays date. if not matching, remove lockout
    if(localStorage.getItem("lockOutDate")!=String(new Date().getDate())){
      localStorage.setItem("lockOut","false")
      localStorage.removeItem("lockOutDate")
    }

  }

  checkCredentials() {
    // check passwords match, badCOunt not zero, lockoutdate not today
    if(this.inputPassword==this.adminPassword && this.badCountLeft>0 && localStorage.getItem("lockOutDate")!=String(new Date().getDate())){
      console.log("passed")
      this.isLoginValid=true
      localStorage.setItem("lockOut","false")
    } else if(this.badCountLeft<=0){
      localStorage.setItem("lockOut","true")
      localStorage.setItem("lockOutDate",String(new Date().getDate()))
    } else{
      this.badCountLeft-=1
      this.isLoginValid=false
    }
  }

  //login for company
  adminLogIn() {
    console.log("admin login")
    this.checkCredentials() 
    if(this.isLoginValid==true) {
      console.log("Company ID saved locally")
      this.cidSer.logOutCompany()
      this.uidSer.logInAdmin()
      window.location.reload()
    } 
  }
}
