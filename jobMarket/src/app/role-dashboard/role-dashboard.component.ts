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
  role: Role
  ranks: number[]


  constructor(private rolSvc:RoleService) {
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
      medChange: 0,
      vacancies : []
      }
  }
  
  ngOnInit() {
    this.loadAllRoles()
  }

  loadAllRoles(){
    this.rolSvc.loadAllRolesFromService().subscribe(
      response => {
        this.allRoles = response
        for(let role of this.allRoles){
          console.log(role)
          console.log(role.roleId)
          this.findVacanciesOfRole(role)
        }
      }
    )
  }

  findVacanciesOfRole(role){
    this.rolSvc.loadVacanciesOfRoleFromService(role.roleId).subscribe(
      response => {
        role.vacancies = response
        console.log(role.vacancies)
        
        role.vacCount = 0
        role.medChange = 0

        role.rankNow = 0
        role.sumSalaryNow = 0
        role.medSalaryNow = 0
        role.numVacanciesNow = 0

        role.rankPrev = 0
        role.sumSalaryPrev = 0
        role.medSalaryPrev = 0
        role.numVacanciesPrev = 0
        
        // check whether there are any vacancies associated
        if(role.vacancies != undefined){
          this.vacancyCalculations(role)
        }
      }
    )
  }

  // perform calculations on vacancies of role
  vacancyCalculations(role){
    role.vacCount = role.vacancies.length
    
    for(let vac of role.vacancies){
      console.log("vac object:"+vac)
      
      if(vac.uploadYear == 2013){ // this year (2013 is last year in db)
        role.sumSalaryNow = vac.salary
        role.numVacanciesNow += 1
        console.log("sum now: "+role.sumSalaryNow)
        console.log("num now: "+role.numVacanciesNow)
      }
      if(vac.uploadYear == 2012){ // last year
        role.sumSalaryPrev += vac.salary
        role.numVacanciesPrev += 1
        console.log("sum prev: "+role.sumSalaryPrev)
        console.log("num prev: "+role.numVacanciesPrev)
      }
    }
    console.log("sum now fin: "+role.sumSalaryNow)
    console.log("num now fin: "+role.numVacanciesNow)
    if(role.numVacanciesNow!=0){
      role.medSalaryNow = Math.floor(role.sumSalaryNow/role.numVacanciesNow)
    }
    if(role.numVacanciesPrev!=0){
      role.medSalaryPrev = Math.floor(role.sumSalaryPrev/role.numVacanciesPrev)
    }
    if(role.numVacanciesPrev!=0 && role.numVacanciesNow!=0){
      role.medChange = Math.floor(100*role.medSalaryNow/role.medSalaryPrev)
    }
    console.log("med now:"+role.medSalaryNow)
    console.log("med prev"+role.medSalaryPrev)
  }

  roleCalculations(allRoles){
    for(let role of allRoles){
      this.ranks[role.roleId] = role.medSalaryNow
    }
    console.log(this.ranks)
    this.ranks.sort()
  }

}
