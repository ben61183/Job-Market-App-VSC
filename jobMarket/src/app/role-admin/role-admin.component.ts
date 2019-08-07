import { Component, OnInit } from '@angular/core';
import { Role } from '../role';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role-admin',
  templateUrl: './role-admin.component.html',
  styleUrls: ['./role-admin.component.css']
})
export class RoleAdminComponent implements OnInit {
    allRoles: Role[]
    roleID: number
    category: string
    role_name: string
    isEditable: boolean

  constructor(private roleSvc:RoleService) { 
    this.roleID = 1
    this.category = "Programming Languages"
    this.role_name = "Python"
  }

  ngOnInit() {
    this.loadAllRoles() 
  }

  loadAllRoles(){
    this.roleSvc.loadAllRolesFromService().subscribe(
      response => {
        this.allRoles = response
      }
    )
  }

  toggleEdit() {
    this.isEditable = !this.isEditable
    this.updateRoleDetails() 
  }

  updateRoleDetails() {
    this.roleSvc.updateRoleOnServer({
      category: this.category,
      role_name: this.role_name
    }).subscribe(
      
    )
  }

}
