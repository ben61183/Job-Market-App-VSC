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
  vacanciesYears: number[] = []; 

  vacanciesYearsList: string; 
  lineChartYAxis: any;
  vacanciesSalary: any[] = [];

  constructor(private rolSvc: RoleService, private route: ActivatedRoute) {

    // accessing roleId from url param
    this.oneRoleId = this.route.snapshot.params.roleId
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
  public lineChartLabels = []; 

  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public lineChartType = "line"
  public lineChartLegend = true
  
  public lineChartData = [
    {data: [], label: 'Salary Per Year'},
  ]

  ngOnInit() {
    this.role.roleId = this.oneRoleId
    this.findOneRole(this.oneRoleId)
    this.findVacanciesOfRole(this.oneRoleId)
    this.vacancyCalculations(this.role.vacancies)
    
    
  }

  // filter jobs by category
  findJobsByCategory(searchParam){
    this.rolSvc.findJobsByCategory(searchParam)
  }

  // find one role using id
  findOneRole(roleId){
    console.log("find one run")
    this.rolSvc.findRoleByRoleId(roleId).subscribe(
      response =>{
        this.role.roleName = response.roleName
        this.role.category = response.category
      }
    )
  }

  // access the vacancies of the loaded role
  findVacanciesOfRole(roleId){
    console.log("find vacs run")
    this.rolSvc.loadVacanciesOfRoleFromService(roleId).subscribe(
      response => {
        this.role.vacancies = response
        console.log(this.role.vacancies)
        this.vacancyCalculations(this.role.vacancies)

        for (var i = 0; i < response.length; i++){
          this.vacanciesYears.push(response[i].uploadYear)
          this.vacanciesYears.sort() 
          
          this.vacanciesSalary.push(response[i].salary)
          this.vacanciesSalary.sort()
        }
        
        // this.vacanciesYears.forEach((year,i) => {
          // if(year!=this.vacanciesYears[i-1]){this.lineChartLabels.push(year), this.lineChartData[0].data.push(this.vacanciesSalary[i])}else{this.lineChartData[0].data[i]+=this.vacanciesSalary[i]}
        // });
          
        this.lineChartLabels = this.vacanciesYears
        this.lineChartData[0].data = this.vacanciesSalary
        
      } 
    )
  }

  // perform vacancy calculations
  vacancyCalculations(vacancies){
    this.vacCount = vacancies.length

    // iterate through vacancies
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

