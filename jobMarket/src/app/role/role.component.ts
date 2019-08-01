import { Component, OnInit, Input } from '@angular/core';
import { RoleService } from '../role.service';
import { Role } from '../role';
import { ActivatedRoute } from '@angular/router';
import { RoleDashboardComponent } from '../role-dashboard/role-dashboard.component';
import { Vacancy } from '../vacancy';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  
  role: Role
  oneRoleId: number // id of specific role (taken from dash)
  vacCount: number // total vacancies in role

  // creation of inputs for parent-child link with the Role Dashboard Component
  @Input('roleId') roleId: number


  constructor(private rolSvc: RoleService, private route: ActivatedRoute) {

    this.oneRoleId = this.route.snapshot.params.roleId

    this.role={
    roleId : 0,
    category : "category",
    roleName : "role",
    rankNow : 0,
    sumSalaryNow: 0,
    medSalaryNow : 0,
    numVacanciesNow : 0,
    rankPrev : 0,
    sumSalaryPrev : 0,
    medSalaryPrev : 0,
    numVacanciesPrev : 0,
    vacCount: 0,
    vacancies : []
    }
  }

  ngOnInit() {
    this.role.roleId = this.oneRoleId
    this.findOneRole(this.oneRoleId)
    this.findVacanciesOfRole(this.oneRoleId)
    this.vacancyCalculations(this.role.vacancies)
  }

  findOneRole(roleId){
    console.log("find one run")
    this.rolSvc.findRoleByRoleId(roleId).subscribe(
      response =>{
        this.role.roleName = response.roleName
        this.role.category = response.category
      }
    )
  }

  findVacanciesOfRole(roleId){
    console.log("find vacs run")
    this.rolSvc.loadVacanciesOfRoleFromService(roleId).subscribe(
      response => {
        this.role.vacancies = response
        this.vacancyCalculations(this.role.vacancies)
      }
    )
  }

  vacancyCalculations(vacancies){
    this.vacCount = this.role.vacancies.length

    for(let vac of vacancies){
      if(vac.uploadYear == 2013){ // this year (2013 is last year in db)
        this.role.sumSalaryNow += vac.salary
        this.role.numVacanciesNow += 1
      }
      if(vac.uploadYear == 2012){ // last year
        this.role.sumSalaryPrev += vac.salary
        this.role.numVacanciesPrev += 1
      }
    }
    this.role.medSalaryNow = this.role.sumSalaryNow/this.role.numVacanciesNow
    this.role.medSalaryPrev = this.role.sumSalaryPrev/this.role.numVacanciesPrev
  }
}
