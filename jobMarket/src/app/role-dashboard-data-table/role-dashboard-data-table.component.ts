import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


import { Role } from '../role';
import { RoleRank } from '../role-rank';
import { RoleService } from '../role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-dashboard-data-table',
  templateUrl: './role-dashboard-data-table.component.html',
  styleUrls: ['./role-dashboard-data-table.component.css']
})

export class RoleDashboardDataTableComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource: MatTableDataSource<Role>;
  
  
  displayedColumns = ['name','rankNow', 'rankChange',  'category', 'sumSalaryNow', 'medChange', 'vacCount', 'numVacanciesNow']

  oneRoleId: number // id of specific role (taken from dash)
  vacCount: number // total vacancies in role
  searchParam: string // parameter for search filter function
  allRoles: Role[]
  role: Role
  ranks: RoleRank[] = []// object for creating ranked roles

  //used to search 
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

constructor(private rolSvc:RoleService, private router: Router) {
    this.searchParam = " "
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
    this.dataSource = new MatTableDataSource(); 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 

    // load all roles via REST
    this.rolSvc.loadAllRolesFromService().subscribe(
      response => {
        this.allRoles = response
        console.log(response) 
        this.dataSource.data = response
        for(let role of this.allRoles){
          this.findVacanciesOfRole(role)
        }
      }
    )
  }

// find all vacancies from roleId via REST
findVacanciesOfRole(role){
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
        
        // check if there are any vacancies associated 
        this.vacancyCalculations(role)
        
      }
    )
  }

vacancyCalculations(role) {
  if(role.vacancies != undefined) {
  role.vacCount = role.vacancies.length
  
  for(let vac of role.vacancies) {
    if (vac.uploadYear == 2013) {
      role.sumSalaryNow = vac.salary
      role.numVacanciesNow += 1
    }
    if(vac.uploadYear == 2012){ // last year
      role.sumSalaryPrev += vac.salary
      role.numVacanciesPrev += 1
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
  
  }
  // if no vacancies associated, set all calculatable values to zero
  } else{role.vacancies.uploadYear=0
    role.vacancies.sumSalaryNow=0
    role.vacancies.numVacanciesNow=0
    role.vacancies.numVacanciesPrev=0
    role.vacancies.sumSalaryPrev=0
    role.vacancies.medSalaryNow=0
    role.vacancies.medSalaryPrev=0
    role.vacancies.medChange=0
    role.rank=0}

    // wait until the last role has been fetched and assigned its vacancies
    if(role.roleId == this.allRoles[this.allRoles.length-1].roleId){
      console.log("entered role calc if statement")
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
      // console.log(role.rankNow)
      //console.log(role.rankPrev)
      // console.log("rank change:"+role.rankChange)
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
      // console.log(role.rankNow)
      // console.log(role.rankPrev)
      // console.log("rank change:"+role.rankChange)
    }
  }

}

rankRoles(allRoles){
  // console.log("rank role")
  // console.log("size:"+this.ranks.length)
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
 

  
    
  

