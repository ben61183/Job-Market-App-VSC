import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { Role } from '../role';

@Component({
  selector: 'app-role-dashboard',
  templateUrl: './role-dashboard.component.html',
  styleUrls: ['./role-dashboard.component.css']
})
export class RoleDashboardComponent implements OnInit {
  allRoles: Role[]
  constructor(private rolSvc:RoleService) { }
  
  ngOnInit() {
    this.loadAllRoles()
  }

  loadAllRoles(){
    this.rolSvc.loadAllRolesFromService().subscribe(
      response => {
        this.allRoles = response
      }
    )
  }

  // vacanciesOfRole(){
  //   for(let role of this.allRoles){
  //     // for(let vacancy of )
  //     if(role.roleName==){

  //     }
  //   }
  // }

}
