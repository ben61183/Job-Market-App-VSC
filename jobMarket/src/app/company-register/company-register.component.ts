import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit{

  companyId: number;
  newCompanyName: string;
  hqLocation:string
  linkedIn:string
  newUsername: string
  newPassword: string 
  confirmPassword: string 

  isUserFormVisible:boolean
  isPassMatch:boolean
  isError:boolean
  isPassCheck:boolean
  isUsernameCheck: boolean
  isEmailCheck: boolean
  isUniqueEmail: boolean
  isUniqueUsername: boolean

  allCompanys; 

  constructor(private companySvc: CompanyService) {
    this.isPassMatch
    this.isError=true
    this.isUniqueEmail=true
    this.isUniqueUsername=true

    this.isPassCheck=false;
    this.isUsernameCheck=false;
    this.isEmailCheck=false;

    this.companyId = 0; 
    this.newCompanyName = "";
    this.hqLocation = ""; 
    this.linkedIn = "";
    this.newUsername = ""; 
    this.newPassword = "";  
  }

  ngOnInit() {
    this.loadAllCompanys()
  }

  loadAllCompanys() {
    this.companySvc.loadAllCompanysFromServer().subscribe(
      response => 
      {this.allCompanys=response}
    )
  }

  createNewCompany() {
    this.companySvc.updateCompanyOnServer({
      companyId: this.companyId, companyName: this.newCompanyName, hqLocation: this.hqLocation, linkedIn: this.linkedIn, companyUsername: this.newUsername, companyPassword: this.newPassword}).subscribe(
        response=>{
          this.companyId = response.companyId
          this.newCompanyName = response.companyName
          this.hqLocation = response.hqLocation
          this.linkedIn = response.linkedIn
          this.newUsername = response.username
          this.newPassword = response.password
        }
      )
      console.log(this.newUsername)
      window.location.reload();
  }

  passwordCheck() {
    if (this.confirmPassword==this.newPassword){
      return this.isPassCheck=true;
    } else{
      this.isError=false;
    } 
  }

  uniqueUsernameCheck() {
    for (let company of this.allCompanys){
      if (company.username!=this.newUsername){
        return this.isUsernameCheck=true
      } else {
        console.log("This.Username " + this.newUsername)
        console.log("Company.username" + company.username)
        return this.isUniqueUsername=false
      }
    }
  }

  signUp() {
    this.isError=true
    this.isUniqueEmail=true
    this.isUniqueUsername=true
    this.passwordCheck() 
    this.uniqueUsernameCheck()
    console.log(this.isUsernameCheck)
    if(this.isPassCheck==true && this.isUsernameCheck==true) {
      this.createNewCompany();
      console.log("create company")
    }
    
  }

}
