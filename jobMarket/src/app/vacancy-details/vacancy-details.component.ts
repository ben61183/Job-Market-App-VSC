import { Component, OnInit } from '@angular/core';
import { Skill } from '../skill';
import { VacancyService } from '../vacancy.service';
import { SkillService } from '../skill.service';
import { ActivatedRoute } from '@angular/router';
import { VacancyIdService } from '../vacancy-id.service';

@Component({
  selector: 'app-vacancy-details',
  templateUrl: './vacancy-details.component.html',
  styleUrls: ['./vacancy-details.component.css']
})
export class VacancyDetailsComponent implements OnInit {

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
  vacancySkills: Skill[]

  constructor(private vacSvc: VacancyService, private skiSvc: SkillService, private route: ActivatedRoute,
    private vidSvc:VacancyIdService) {
    this.vacancyId = this.route.snapshot.params.vacancyId;
    this.company="default company";
    this.description="default description";
    this.job_type=false;
    this.link="default website";
    this.location="default location";
    this.postTime="default post time";
    this.salary=0;
    this.title="default title";
    this.uploadYear=0;
    this.vacancySkills = [];
  }

  ngOnInit() {
    this.vidSvc.currentVacancyId.subscribe(myVacancyId=>this.vacancyId=myVacancyId)
    this.fetchCurrentVacancyFromService()
  }

  fetchCurrentVacancyFromService(){
    console.log(this.vacancyId)
    this.vacSvc.findVacancybyVacancyId(this.vacancyId).subscribe(
  
      response => {
        this.vacancyId=response.vacancyId
        this.company=response.company
        this.description=response.description
        this.job_type=response.job_type
        this.link=response.link
        this.location=response.location
        this.postTime=response.postTime
        this.salary=response.salary
        this.title=response.title
        this.uploadYear=response.uploadYear;
        this.loadVacancySkills(this.vacancyId)
      }
    )
  }

  loadVacancySkills(vacancyId){
    this.vacSvc.loadVacancySkillsFromServer(vacancyId).subscribe(
      response => {
        this.vacancySkills = response
      }
    )
  }
}
