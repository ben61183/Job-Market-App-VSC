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
  email: string 

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
    this.isEmailCheck=true;

    this.companyId = 0; 
    this.newCompanyName = "";
    this.hqLocation = ""; 
    this.linkedIn = "";
    this.newUsername = ""; 
    this.newPassword = "";  
    this.email = "";
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
      companyId: this.companyId, companyName: this.newCompanyName, 
      hqLocation: this.hqLocation, linkedIn: this.linkedIn, companyUsername: this.newUsername, 
      companyPassword: this.newPassword, email: this.email}).subscribe(
        response=>{
          this.companyId = response.companyId
          this.newCompanyName = response.companyName
          this.hqLocation = response.hqLocation
          this.linkedIn = response.linkedIn
          this.newUsername = response.companyUsername
          this.newPassword = response.password
          this.email = response.email
        }
      )
      window.location.reload();
  }

  passwordCheck() {
    if (this.confirmPassword==this.newPassword){
      this.isPassCheck=true;
    } else{
      this.isError=false;
    } 
  }

  uniqueUsernameCheck() {
    for (let company of this.allCompanys){
      if (company.email == this.email){
        this.isUniqueEmail = false
      } else {
        this.isUniqueEmail = true
      }
    }
  }

  uniqueEmailCheck() {
    for (let company of this.allCompanys){
      if (company.email!=this.email){
      if (company.username!=this.newUsername && this.newUsername.length>=8){
        return this.isUsernameCheck=true
      } else {
        return this.isUniqueUsername=false
      }
    }
  }
}

  emailCheck(){
    if(!this.email.includes("@")){
      this.isEmailCheck=false
      console.log("em false")
    } else{
      this.isEmailCheck=true
      console.log("em true")
    }
  }

  signUp() {
    this.isError=true
    this.isUniqueEmail=true
    this.isUniqueUsername=true
    this.isEmailCheck=true
    this.passwordCheck() 
    this.uniqueUsernameCheck()
    this.uniqueEmailCheck() 
    console.log(this.isUsernameCheck)
    if(this.isPassCheck==true && this.isUsernameCheck==true && this.isUniqueEmail == true) {
    this.emailCheck()
    if(this.isPassCheck==true && this.isUsernameCheck==true && this.isEmailCheck==true) {
      this.createNewCompany();
    }
    
  }
  
  }
}
