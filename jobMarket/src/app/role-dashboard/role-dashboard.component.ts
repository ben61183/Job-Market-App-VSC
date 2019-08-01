import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { Role } from '../role';
import { ActivatedRoute } from '@angular/router';
import { RoleComponent } from '../role/role.component';


@Component({
  selector: 'app-role-dashboard',
  templateUrl: './role-dashboard.component.html',
  styleUrls: ['./role-dashboard.component.css']

})
export class RoleDashboardComponent implements OnInit {

  oneRoleId: number // id of specific role (taken from dash)
  vacCount: number // total vacancies in role

  allRoles: Role[]
  constructor(private rolSvc:RoleService) {
  }
  
  ngOnInit() {
    this.loadAllRoles()
  }

  loadAllRoles(){
    this.rolSvc.loadAllRolesFromService().subscribe(
      response => {
        this.allRoles = response
        for(let role of this.allRoles){
          // role.vacCount = role.vacancies.length   
          console.log(role.vacCount)
          // this.vacancyCalculations(role)
        }
      }
    )
  }

  vacancyCalculations(role){
    console.log(role.vacancies)
    this.vacCount = role.vacancies.length

    for(let vac of role.vacancies){
      if(vac.uploadYear == 2013){ // this year (2013 is last year in db)
        role.sumSalaryNow += vac.salary
        role.numVacanciesNow += 1
      }
      if(vac.uploadYear == 2012){ // last year
        role.sumSalaryPrev += vac.salary
        role.numVacanciesPrev += 1
      }
    }
    role.medSalaryNow = role.sumSalaryNow/role.numVacanciesNow
    role.medSalaryPrev = role.sumSalaryPrev/role.numVacanciesPrev
  }

}
