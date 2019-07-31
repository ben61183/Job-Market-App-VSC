import { Component, OnInit, Input } from '@angular/core';
import { RoleService } from '../role.service';
import { Role } from '../role';
import { ActivatedRoute } from '@angular/router';
import { RoleDashboardComponent } from '../role-dashboard/role-dashboard.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  
  role: Role
  oneRoleId:number

  // creation of inputs for parent-child link with the Role Dashboard Component
  // @Input() roleDash: RoleDashboardComponent
  @Input('roleId') roleId: number


  constructor(private rolSvc: RoleService, private route: ActivatedRoute) {

    this.oneRoleId = this.route.snapshot.params.roleId

    this.role={
    roleId : 11,
    category : "category",
    roleName : "role",
    rankNow : 0,
    medSalaryNow : 0,
    numVacanciesNow : 0,
    rankPrev : 0,
    medSalaryPrev : 0,
    numVacanciesPrev : 0
    }
  }

  ngOnInit() {
    // this.fetchRoleFromService()
    this.role.roleId = this.oneRoleId
    // this.role = this.rolSvc.findRoleByRoleId(this.oneRoleId)
  }
  
  fetchRoleFromService(){
  //   this.rolSvc.findRoleByRoleId(this.role.roleId).subscribe(
  //     response => {
  //       this.role.roleId = response.oneRoleId
  //     }
  //   )
  }
}