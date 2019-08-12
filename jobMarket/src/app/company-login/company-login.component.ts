import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { UserIdService } from '../user-id.service';
import { CompanyIdService } from '../company-id.service';
@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent implements OnInit {
  
  companyId: number
  companyUsername: string 
  companyPassword: string 

  isLoginValid: boolean 
  isError: boolean 
  allCompanys: Company[]
  
  myUserId: number
  myCompanyId: number

  constructor(private compSvc: CompanyService, private uidSer:UserIdService, private cidSer:CompanyIdService) {
    this.isLoginValid = false; 
    this.isError = false; 

    this.companyId = -1; 
    this.companyUsername=""; 
    this.companyPassword="";
  }

  ngOnInit() {
    // this.myUserId = this.uidSer.getUserId()
    this.myCompanyId = this.cidSer.getCompanyId()
    this.loadAllCompanys() 
  }

  loadAllCompanys() {
    this.compSvc.loadAllCompanysFromServer().subscribe(
      response => {
        this.allCompanys=response
      }
    )
  }

  checkCredentials() {
    for(let company of this.allCompanys){
      if (company.username==this.companyUsername && company.password==this.companyPassword){
        this.companyId=company.companyId
        console.log(this.companyId)
        this.isLoginValid=true
      } else{
        this.isError=true
      
      }
    }
  }

  companyLogIn() {
    this.checkCredentials() 
    if(this.isLoginValid==true) {
      console.log("Company ID saved locally")
      this.cidSer.changeCompanyId(this.companyId)
    }
  }
  

}