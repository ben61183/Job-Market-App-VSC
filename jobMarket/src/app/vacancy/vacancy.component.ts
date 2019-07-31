import { Component, OnInit } from '@angular/core';
import { Role } from '../role';

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

  thisRole: Role;
  isEditable: Boolean;


  constructor() { 
  
  this.isEditable= false

  this.vacancyId=22;
  this.company="default company";
  this.description="default description";
  this.job_type=false;
  this.link="default website";
  this.location="default location";
  this.postTime="default post time";
  this.salary=0;
  this.title="";

  this.thisRole={
    roleId:2,
    category:"deafulat catagory",
    roleName:"default role",
    rankNow: 3,
    medSalaryNow: 1400,
    numVacanciesNow: 40,
    rankPrev:4,
    medSalaryPrev:1200,
    numVacanciesPrev:5432

  
  }

  }
  ngOnInit() {

  }

  toggleEdits(){
    this.isEditable=!this.isEditable 
  }

}
