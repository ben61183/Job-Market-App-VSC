import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { Role } from '../role';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit, Role {
  roleId:number
  category:string
  roleName:string
  rankNow:number
  medSalaryNow:number
  numVacanciesNow:number
  rankPrev:number
  medSalaryPrev:number
  numVacanciesPrev:number
  role:Role



  constructor(private rolSvc: RoleService) {
    this.role={
    roleId : 11,
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
    this.fetchRoleFromService()
  }
  

  fetchRoleFromService(){
    this.rolSvc.findRoleByRoleId(this.role.roleId).subscribe(
      response => {
        this.role.roleId = response.roleId
      }
    )
  }
}
