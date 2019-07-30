import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { Role } from '../role';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  role:Role
  constructor(private rolSvc: RoleService) {
    this.role.roleId = 0
    this.role.category = "default category"
    this.role.roleName = "default name"
    this.role.rankNow = 0
    this.role.medSalaryNow = 0
    this.role.numVacanciesNow = 0
    this.role.rankPrev = 0
    this.role.medSalaryPrev = 0
    this.role.numVacanciesPrev = 0
  }

  ngOnInit() {
    this.fetchRoleFromService()
  }

  fetchRoleFromService(){
    this.rolSvc.findRoleByRoleId(this.role.roleId).subscribe(
      response => {
        this.role = response.role
      }
    )
  }


}
