import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent{

  companyId: number;
  newCompanyName: string;
  hqLocation:string
  linkedIn:string
  username: string
  password: string 

  constructor(private companySvc: CompanyService) {
    this.companyId = 0; 
    this.newCompanyName = "";
    this.hqLocation = ""; 
    this.linkedIn = "";
    this.username = ""; 
    this.password = "";  
  }

  createNewCompany() {
    this.companySvc.updateCompanyOnServer({
      companyId: this.companyId, companyName: this.newCompanyName, hqLocation: this.hqLocation, linkedIn: this.linkedIn, username: this.username, password: this.password}).subscribe(
        response=>{
        }
      )
      window.location.reload();
  }

}
