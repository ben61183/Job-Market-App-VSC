import { Component, OnInit } from '@angular/core';
import { Role } from '../role';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {
  
  newRoleId: number
  newCategory: String
  newRoleName: String 
  roles: Role[]
  selectedRole; 
  isEditRoleFormVisible: boolean; 
  valid:boolean
  validError:string

  constructor(private roleSvc:RoleService) { 
    this.newRoleId = -1; 
    this.newCategory = "";
    this.newRoleName = ""; 
    this.selectedRole = 0; 
    this.isEditRoleFormVisible = false;
    this.valid=true
    this.validError=""
  }

  //load list of all roles
  ngOnInit() {
    this.loadAllRoles() 
  }

  //select new role
  selected() {
    this.newRoleId=this.selectedRole.roleId
    console.log("selected: " + this.newRoleId)
  }

  //load all roles
  loadAllRoles() {
    this.roleSvc.loadAllRolesFromService().subscribe(
      response => {
        this.roles = response 
      }
    )
  }

  //get rold by role id
  showUpdateRoleForm() {
    this.isEditRoleFormVisible = true; 
    this.roleSvc.findRoleByRoleId(this.newRoleId).subscribe(
      response => {
        console.log(response)
        // this.newRoleId = response.roleId
        this.newRoleName = response.roleName 
        this.newCategory = response.category
      }
    )
  }

  // update role upon validation checks
  updateRole() {
    this.valid=true
    this.validError=""
    this.validationChecks()
    if(this.valid){
    this.roleSvc.updateRoleOnServer({
      roleId: this.newRoleId,
      category: this.newCategory,
      roleName: this.newRoleName
      
    } ).subscribe(
      response => {
        this.newRoleId = response.roleId
        this.newCategory = response.category
        this.newRoleName = response.roleName
        
     }
    )
      window.location.reload()
    }
  }

  deleteRole() {
    this.roleSvc.deleteRoleByRoleId(this.newRoleId).subscribe()
    window.location.reload()
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
