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

  constructor(private roleSvc:RoleService) { 
    this.newRoleId = -1; 
    this.newCategory = "";
    this.newRoleName = ""; 
    this.selectedRole = 0; 
    this.isEditRoleFormVisible = false; 
  }

  ngOnInit() {
    this.loadAllRoles() 
  }

  selected() {
    this.newRoleId=this.selectedRole.roleId
    console.log("selected: " + this.newRoleId)
  }

  loadAllRoles() {
    this.roleSvc.loadAllRolesFromService().subscribe(
      response => {
        this.roles = response 
      }
    )
  }

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

  updateRole(roleId) {
    this.roleSvc.updateRoleOnServer({
      roleId: this.newRoleId,
      category: this.newCategory,
      roleName: this.newRoleName
    }).subscribe(
      response => {
        this.newRoleId = response.roleId
        this.newCategory = response.category
        this.newRoleName = response.roleName
        console.log(response)
      }
    )
      // window.location.reload()
  }

}
