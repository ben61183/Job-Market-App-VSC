import { Component, OnInit } from '@angular/core';
import { Role } from '../role';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  newRoleId: number
  newCategory: string
  newRoleName: string 
  roles: Role[] 

  constructor(private rolSvc: RoleService) { 
    this.newRoleId=0
    this.newCategory=" "
    this.newRoleName=" "
  }

  ngOnInit() {
  }

 

  createNewRole() {
    this.rolSvc.updateRoleOnServer({
      roleid:this.newRoleId, roleName:this.newRoleName, category:this.newCategory}).subscribe(
        response=>{
          console.log(response)
          this.newRoleId = response.roleId
          this.newRoleName = response.roleName
          this.newCategory = response.category
        }
      )
      window.location.reload(); //reload the page once a new roles added
  }
}
