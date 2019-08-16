import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../company';
import { CompanyIdService } from '../company-id.service';
import { UserIdService } from '../user-id.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  companyId: number
  name: string 
  newUsername: string
  email: string 
  location: string
  linkedIn: string 
  checkPassword: string 
  old_password: string 
  new_password: string 
  confirm_new_password: string 
  
  myUserId:number

  passwordsMatch: boolean 

  constructor(private compSvc: CompanyService, private idsvc: CompanyIdService,
    private uidSvc:UserIdService) { }

  //display company
  ngOnInit() {
    this.myUserId = this.uidSvc.getUserId()
    this.companyId=Number(localStorage.getItem("editCompanyId"))
    this.displayCompany() 
    this.passwordsMatch = true; 
  }

//fetch company from locally stored company id
  displayCompany() {
    this.compSvc.fetchCompanyFromService(this.companyId).subscribe(
      response => {
        this.companyId = response.companyId
        this.name = response.companyName
        this.email = response.email
        this.location = response.hqLocation
        this.linkedIn = response.linkedIn
        this.checkPassword = response.password
        this.newUsername = response.username
        if(this.myUserId==1){
          this.old_password = this.checkPassword
        }
      }
    )
  }

  //validity
  clickSave() {
    if (this.checkPassword == this.old_password && this.new_password == this.confirm_new_password) {
      console.log("Passwords Match!")
      this.passwordsMatch = true; 
      console.log(this.newUsername)
      this.saveCompany()
    } else {
      console.log("Passwords Dont Match!")
      this.passwordsMatch = false; 
    }
  }

  //update this company details
  saveCompany() {
    this.compSvc.updateCompanyOnServer({
      companyId: this.companyId,
      companyName: this.name,
      hqLocation: this.location,
      linkedIn: this.linkedIn,
      email: this.email,
      companyPassword: this.new_password,
      companyUsername: this.newUsername
    }).subscribe()
      
    
    window.location.reload()
  
  }
}
