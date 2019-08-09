import { Component, OnInit } from '@angular/core';
import { Skill } from '../skill';
import { VacancyService } from '../vacancy.service';
import { SkillService } from '../skill.service';
import { ActivatedRoute } from '@angular/router';
import { VacancyIdService } from '../vacancy-id.service';
import { Company } from '../company';
import { Vacancy } from '../vacancy';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-vacancy-details',
  templateUrl: './vacancy-details.component.html',
  styleUrls: ['./vacancy-details.component.css']
})
export class VacancyDetailsComponent implements OnInit {

  vacancy:Vacancy;

  constructor(private vacSvc: VacancyService, private skiSvc: SkillService, private route: ActivatedRoute,
    private vidSvc:VacancyIdService) {
      this.vacancy={
        vacancyId: this.route.snapshot.params.vacancyId,
        thisCompany: {companyId:0,linkedIn:"",hqLocation:"",companyName:""},
        description: "description",
        job_type: true,
        link: "link",
        location: "location",
        postTime: "12:55",
        salary: 0,
        title: "title",
        uploadYear: 2019,
        vacancySkills: []
      }
  }

  ngOnInit() {
    this.vidSvc.currentVacancyId.subscribe(myVacancyId=>this.vacancy.vacancyId=myVacancyId)
    this.fetchCurrentVacancyFromService()
  }

  fetchCurrentVacancyFromService(){
    console.log("inside details:"+this.vacancy.vacancyId)
    this.vacSvc.findVacancybyVacancyId(this.vacancy.vacancyId).subscribe(
  
      response => {
        this.vacancy=response;
        // this.vacancy.company=response.thisCompany
        this.loadVacancySkills(this.vacancy.vacancyId)
        console.log("company:"+response.thisCompany)
      }
    )
  }

  loadVacancySkills(vacancyId){
    this.vacSvc.loadVacancySkillsFromServer(vacancyId).subscribe(
      response => {
        this.vacancy.vacancySkills = response
      }
    )
  }
  
}
