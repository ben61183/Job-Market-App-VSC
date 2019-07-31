import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { Role } from '../role';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-role-dashboard',
  templateUrl: './role-dashboard.component.html',
  styleUrls: ['./role-dashboard.component.css']
})
export class RoleDashboardComponent implements OnInit {
  allRoles: Role[]
  oneRole: Role
  constructor(private rolSvc:RoleService) {
    this.oneRole={
      roleId : 0,
      category : "default category",
      roleName : "default name",
      rankNow : 0,
      medSalaryNow : 0,
      numVacanciesNow : 0,
      rankPrev : 0,
      medSalaryPrev : 0,
      numVacanciesPrev : 0
      }
  }
  
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

  loadOneRole(role){
    this.rolSvc.findRoleByRoleId(role.roleId).subscribe(
      response => {
        this.oneRole.roleId = response.roleId
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
