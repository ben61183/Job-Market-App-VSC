import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { Role } from '../role';
import { RoleRank } from '../role-rank';

@Component({
  selector: 'app-role-dashboard',
  templateUrl: './role-dashboard.component.html',
  styleUrls: ['./role-dashboard.component.css']
})

export class RoleDashboardComponent implements OnInit {

  oneRoleId: number // id of specific role (taken from dash)
  vacCount: number // total vacancies in role

  searchParam: string // parameter for search filter function

  allRoles: Role[]
  role: Role
  ranks: RoleRank[] = []// object for creating ranked roles

  constructor(private rolSvc:RoleService) {
    this.searchParam = " "
    // empty role object
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
      rankChange: 0,
      vacancies : []
    }
  }
  
  ngOnInit() {
    this.loadAllRoles()
  }

  // load all roles via REST
  loadAllRoles(){
    this.rolSvc.loadAllRolesFromService().subscribe(
      response => {
        this.allRoles = response
        console.log(response)
        for(let role of this.allRoles){
          this.findVacanciesOfRole(role)
          //console.log(role)
        }
      }
    )
  }

  // find all vacancies from roleId via REST
  findVacanciesOfRole(role){
    console.log("Ben find vacancies")
    this.rolSvc.loadVacanciesOfRoleFromService(role.roleId).subscribe(
      response => {
        role.vacancies = response
        
        role.vacCount = 0
        role.medChange = 0
        role.rank = 0

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
    //console.log("vacancy calculations")
    role.vacCount = role.vacancies.length // count of vacancies
    
    for(let vac of role.vacancies){
      
      if(vac.uploadYear == 2013){ // this year (2013 is last year in db)
        role.sumSalaryNow = vac.salary // sum salaries
        role.numVacanciesNow += 1 // count vacancies
      }
      if(vac.uploadYear == 2012){ // last year
        role.sumSalaryPrev += vac.salary
        role.numVacanciesPrev += 1
      }
    }
    if(role.numVacanciesNow!=0){ // calculate mean salary
      role.medSalaryNow = Math.floor(role.sumSalaryNow/role.numVacanciesNow)
    }
    if(role.numVacanciesPrev!=0){ // calculate mean salary
      role.medSalaryPrev = Math.floor(role.sumSalaryPrev/role.numVacanciesPrev)
    }
    if(role.numVacanciesPrev!=0 && role.numVacanciesNow!=0){ // calculate % change in mean
      role.medChange = Math.floor(100*role.medSalaryNow/role.medSalaryPrev)
    }
    // wait until the last role has been fetched and assigned its vacancies
    if(role == this.allRoles[this.allRoles.length-1]){
      this.roleCalculations(this.allRoles)
    }
  }

  // perform calculations on all roles
  roleCalculations(allRoles){
    // VACANCY COUNT NOW (this year)
    for(let role of allRoles){
      this.ranks.push({
        roleId:role.roleId,
        roleRank:0,
        numVacancies:role.numVacanciesNow
      })
    }
    this.rankRoles(allRoles)
    // assign ranks
    for(let role of allRoles){
      for(let rankRole of this.ranks){
        if(rankRole.roleId==role.roleId){
          role.rankNow = rankRole.roleRank
        }
        role.rankChange = role.rankNow - role.rankPrev
        //console.log(role.rankNow)
        //console.log(role.rankPrev)
        //console.log("rank change:"+role.rankChange)
      }
    }
    this.ranks = []
    // VACANCY COUNT PREV (last year)
    for(let role of allRoles){
      this.ranks.push({
        roleId:role.roleId,
        roleRank:0,
        numVacancies:role.numVacanciesPrev
      })
    }
    this.rankRoles(allRoles)
    // assign ranks
    for(let role of allRoles){
      for(let rankRole of this.ranks){
        if(rankRole.roleId==role.roleId){
          role.rankPrev = rankRole.roleRank
        }
        role.rankChange = role.rankPrev - role.rankNow

      }
    }

  }

  rankRoles(allRoles){
    this.ranks = this.ranks.sort((obj1,obj2)=>{
      if(obj1.numVacancies > obj2.numVacancies){
        return -1
      } else if(obj1.numVacancies < obj2.numVacancies){
        return 1
      }
      return 0
    })
    // console.log("size:"+this.ranks.length)

    // assign ranking based on the indexes
    this.ranks.forEach((role,i)=>role.roleRank=i+1)
  }
}
