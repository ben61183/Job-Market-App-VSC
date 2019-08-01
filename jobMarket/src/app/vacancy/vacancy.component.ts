import { Component, OnInit } from '@angular/core';
import { Role } from '../role';
import { VacancyService } from '../vacancy.service';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css']
})
export class VacancyComponent implements OnInit {
  
  vacancyId:number;
  company:string;
  description:string;
  job_type:boolean;
  link:string;
  location:string;
  postTime:string;
  salary:number;
  title: string;
  uploadYear: number;

  thisRole: Role;
  isEditable: Boolean;

  selectedRole:number;


  constructor(private vacSvc: VacancyService) { 
  
  this.isEditable= false

  this.vacancyId=5;
  this.company="default company";
  this.description="default description";
  this.job_type=false;
  this.link="default website";
  this.location="default location";
  this.postTime="default post time";
  this.salary=0;
  this.title="default title";
  this.uploadYear=2015;


  this.thisRole={
    roleId:2,
    category:"deafulat catagory",
    roleName:"default role",
    rankNow: 3,
    medSalaryNow: 1400,
    numVacanciesNow: 40,
    rankPrev:4,
    medSalaryPrev:1200,
    numVacanciesPrev:5432,
    vacCount: 0,
    vacancies: [],
    medChange: 15,
    sumSalaryNow: 1000, 
    sumSalaryPrev:700,
    // sum salaries this year
   }

  }
  ngOnInit() {
    this.fetchCurrentVacancyFromService()
  }

  fetchCurrentVacancyFromService(){
    this.vacSvc.findVacancybyVacancyId(this.vacancyId).subscribe(
  
      response => {
        this.vacancyId=  response.vacancyId
        this.company=response.company
        this.description=response.description
        this.job_type=response.job_type
        this.link=response.link
        this.location=response.location
        this.postTime=response.postTime
        this.salary=response.salary
        this.title=response.title
        this.uploadYear=response.uploadYear;
      }
    )
  }

  deleteVacancybyVacancyID(){
      this.vacSvc.findVacancybyVacancyId(this.vacancyId).subscribe()
  }
  
  updateSelection(roleId){
    this.selectedRole=roleId;

  }


  updateVacancyDetails(){
    this.vacSvc.updateVacancyOnServer({
      vacancyId:this.vacancyId, description:this.description,job_type:this.job_type,link:this.link,location:this.location,postTime:this.postTime,salary:this.salary,title:this.title,uploadYear:this.uploadYear
    }).subscribe(
      // response =>{
      //   this.vacSvc.updateVacancyRoleOnServer(this.vacancyId,this.selectedRole).subscribe(        
          responseRole =>{
            this.fetchCurrentVacancyFromService();
        }
        )
      // })
  }

  deleteVacancy(){
    this.deleteVacancybyVacancyID()
  }

  toggleEdits(){
    this.isEditable=!this.isEditable
    this.updateVacancyDetails()
  }

}
