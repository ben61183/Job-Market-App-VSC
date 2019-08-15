import { Component, OnInit } from '@angular/core';
import { Role } from '../role';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {

  newRoleId: number
  newCategory: string
  newRoleName: string 
  roles: Role[] 

  valid:boolean
  validError:string

  constructor(private rolSvc: RoleService) { 
    this.newRoleId=0
    this.newCategory=""
    this.newRoleName=""
    
    this.valid=true
    this.validError=""
  }

  //create new role
  createNewRole() {
    this.valid=true
    this.validError=""
    this.validationChecks()
    if(this.valid){
    this.rolSvc.updateRoleOnServer({
      roleid:this.newRoleId, roleName:this.newRoleName, category:this.newCategory}).subscribe()
      window.location.reload(); //reload the page once a new roles added
    }
  }

  // check validity of fields
  validationChecks(){
    if(this.newCategory == null || this.newCategory == ""){
      this.valid = false
      this.validError+="Select a Category."
    }
    if(this.newRoleName == null || this.newRoleName == ""){
      this.valid = false
      this.validError+=" Enter a Role."
    }
  }
}
