import { Component, OnInit } from '@angular/core';

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

  thisRole: String;

  constructor() { 
  
  this.vacancyId=22;
  this.company="default company";
  this.description="default description";
  this.job_type=false;
  this.link="default website";
  this.location="default location";
  this.postTime="default post time";
  this.salary=0;
  this.title="";

  this.thisRole= 
  {
    
  }

  }
  ngOnInit() {

  }

}
