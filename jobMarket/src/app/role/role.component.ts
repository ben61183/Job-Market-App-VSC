import { Component, OnInit, Input } from '@angular/core';
import { RoleService } from '../role.service';
import { Role } from '../role';
import { ActivatedRoute } from '@angular/router';
import { Skill } from '../skill';
import { UserIdService } from '../user-id.service';
import { CompanyIdService } from '../company-id.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']  ,
  providers: [UserIdService,CompanyIdService]

})
export class RoleComponent implements OnInit {
  
  role: Role
  roleId: number
  category: string
  roleName: string 
  oneRoleId: number // id of specific role (taken from dash)
  vacCount: number // total vacancies in role
  vacanciesYears: number[] = []

  vacanciesYearsList: string; 
  lineChartYAxis: any;
  vacanciesSalary: any[] = [];
  noOfVacancysData: any[] = []; 

  // public pieChartLabels = ["Current Vacancies", "Historical Vacancies", "Last Year Vacancies"];
  public pieChartLabels = ["Current Vacancies", "2018 Vacancies", "2017 Vacancies", "2016 Vacancies", "2015 Vacancies"];

  public pieChartData = [];
  public pieChartType = 'pie';

  public lineChartLabels = []; 
  public lineChartOptions = {scaleShowVerticalLines: false, responsive: true};
  public lineChartType = "line"
  public lineChartLegend = true
  public lineChartData = [{data: [], label: 'Salary Per Year'}]
  
  keySkills: Skill[]
  primarySkill: Skill

  numVacanciesTwo:number
  numVacanciesThree:number
  numVacanciesFour:number

  myUserId:number

  myCompanyId:number

  constructor(private rolSvc: RoleService, private route: ActivatedRoute,private uidSer:UserIdService,
    private cidSer:CompanyIdService) {

    // accessing roleId from url param
    this.oneRoleId = this.route.snapshot.params.roleId

    this.keySkills = [];

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

    this.numVacanciesTwo=0
    this.numVacanciesThree=0
    this.numVacanciesFour=0
  }



  ngOnInit() {
    this.role.roleId = this.oneRoleId
    this.findOneRole(this.oneRoleId)
    this.findVacanciesOfRole(this.oneRoleId)
    this.vacancyCalculations(this.role.vacancies)
    this.uidSer.currentUserId.subscribe(myUserId => this.myUserId = myUserId)
    this.cidSer.currentCompanyId.subscribe(myCompanyId => this.myCompanyId = myCompanyId)

  }

  // filter jobs by category
  findJobsByCategory(searchParam){
    this.rolSvc.findJobsByCategory(searchParam)
  }

  // find one role using id
  findOneRole(roleId){
    //console.log("find one run")
    this.rolSvc.findRoleByRoleId(roleId).subscribe(
      response =>{
        this.role.roleName = response.roleName
        this.role.category = response.category
      }
    )
  }

  // access the vacancies of the loaded role
  findVacanciesOfRole(roleId){
    //console.log("find vacs run")
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
        
        // collates the average of vacancy salaries that occured in the same year.
        this.vacanciesYears.forEach((year,i) => {
          if(year!=this.vacanciesYears[i-1]){this.lineChartLabels.push(year), this.lineChartData[0].data.push(this.vacanciesSalary[i])}
          else{this.lineChartData[0].data.push(this.vacanciesSalary[i])}
        });
          
        // this.lineChartLabels = this.vacanciesYears
        // this.lineChartData[0].data = this.vacanciesSalary
        
      } 
    )
  }

  // perform vacancy calculations
  vacancyCalculations(vacancies){
    this.vacCount = vacancies.length
    //this.noOfVacancysData.push(this.vacCount); //user for pie chart 

    
    // iterate through vacancies
    for(let vac of vacancies){
      if(vac.uploadYear == 2019){ // this year (2013 is last year in db)
        this.role.sumSalaryNow += vac.salary
        this.role.numVacanciesNow += 1
        for(let skill of vac.vacancySkills){
          this.keySkills.push(skill.skill)
        }
      }
      else if(vac.uploadYear == 2018){ // last year
        this.role.sumSalaryPrev += vac.salary
        this.role.numVacanciesPrev += 1
      }
      else if(vac.uploadYear == 2017){ // last year
        this.numVacanciesTwo += 1
      }
      else if(vac.uploadYear == 2016){ // last year
        this.numVacanciesThree += 1
      }
      else if(vac.uploadYear == 2015){ // last year
        this.numVacanciesFour += 1
      }
    }
    this.role.medSalaryNow = this.role.sumSalaryNow/this.role.numVacanciesNow
    this.role.medSalaryPrev = this.role.sumSalaryPrev/this.role.numVacanciesPrev

    this.pieChartData = [this.role.numVacanciesNow, this.role.numVacanciesPrev, this.numVacanciesTwo, this.numVacanciesThree, this.numVacanciesFour]

    console.log(this.noOfVacancysData)
    this.primarySkill = this.keySkills.sort((a,b) => this.keySkills.filter(v => v===a).length - this.keySkills.filter(v => v===b).length).pop()
  }
    
}

