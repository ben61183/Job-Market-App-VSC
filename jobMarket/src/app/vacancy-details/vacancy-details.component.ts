import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../vacancy.service';
import { SkillService } from '../skill.service';
import { ActivatedRoute } from '@angular/router';
import { VacancyIdService } from '../vacancy-id.service';
import { Vacancy } from '../vacancy';
import { UserIdService } from '../user-id.service';
import { CompanyIdService } from '../company-id.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-vacancy-details',
  templateUrl: './vacancy-details.component.html',
  styleUrls: ['./vacancy-details.component.css']  ,
  providers: [UserIdService,CompanyIdService]

})
export class VacancyDetailsComponent implements OnInit {

  vacancy:Vacancy;

  myUserId:number
  myCompanyId:number

  myUserVacancies:Vacancy[]
  
  saved:boolean

  constructor(private vacSvc: VacancyService, private skiSvc: SkillService, private route: ActivatedRoute,
    private vidSvc:VacancyIdService, private uidSer:UserIdService, private cidSer:CompanyIdService,
    private useSvc:UserService) {
      // empty vacancy object
      this.vacancy={
        vacancyId: this.route.snapshot.params.vacancyId,
        thisCompany: {companyId:0,linkedIn:"",hqLocation:"",companyName:"", password:"", username:"", email: ""},
        description: "description",
        job_type: true,
        link: "link",
        location: "location",
        postTime: "12:55",
        salary: 0,
        title: "title",
        uploadYear: 2019,
        vacancySkills: [], 
      }
      // set vacancy as unsaved to user
      this.saved=false
      this.myUserVacancies=[]
  }

  ngOnInit() {
    this.saved=false
    // find id of vacancy
    this.vidSvc.currentVacancyId.subscribe(myVacancyId=>this.vacancy.vacancyId=myVacancyId)
    this.fetchCurrentVacancyFromService()
    // get the user and company ids saved locally
    this.myUserId = this.uidSer.getUserId()
    this.myCompanyId = this.cidSer.getCompanyId()
    // fetch logged in user details
    this.useSvc.findUserByUserId(this.myUserId).subscribe(
      response=>{
        this.myUserVacancies=response.savedVacancies
        for(let uVac of this.myUserVacancies){
          if(uVac.vacancyId==this.vacancy.vacancyId){
            this.saved=true
          } else{
            this.saved=false
          }
        }})
  }

  // fetch the vacancy via backend
  fetchCurrentVacancyFromService(){
    this.vacSvc.findVacancybyVacancyId(this.vacancy.vacancyId).subscribe(
  
      response => {
        this.vacancy=response;
        this.vacancy.link = "http://"+response.link
        this.loadVacancySkills(this.vacancy.vacancyId)
      }
    )
  }

  // load skills of vacancy
  loadVacancySkills(vacancyId){
    this.vacSvc.loadVacancySkillsFromServer(vacancyId).subscribe(
      response => {
        this.vacancy.vacancySkills = response
      }
    )
  }

  // save vacancy to users watch list
  saveVacancyToUser(vacancyId){
    this.useSvc.updateUserVacanciesInService(this.myUserId,vacancyId).subscribe()
    this.saved=true
  }
  
}
