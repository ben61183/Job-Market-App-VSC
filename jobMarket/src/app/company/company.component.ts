import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';
import { Vacancy } from '../vacancy';
import { MatDialog } from '@angular/material';
import { VacancyDetailsComponent } from '../vacancy-details/vacancy-details.component';
import { VacancyIdService } from '../vacancy-id.service';
import { VacancyService } from '../vacancy.service';
import { UserIdService } from '../user-id.service';
import { CompanyIdService } from '../company-id.service';
import { Skill } from '../skill';
import { CompanyEditComponent } from '../company-edit/company-edit.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [UserIdService,CompanyIdService]

})
export class CompanyComponent implements OnInit {

  companyId:number
  companyName:string
  hqLocation:string
  linkedIn:string
  companyUsername: string
  password: string 
  email: string 
  companyVacancies:Vacancy[]=[]
  vacancySkills:Skill[]=[]

  oneVacancy:Vacancy
  myCompanyId:number

  constructor(private route: ActivatedRoute, private comSvc:CompanyService, public dialog: MatDialog,
    public vidSvc:VacancyIdService, private vacSvc:VacancyService, private cidSer:CompanyIdService) {
    this.companyId = this.route.snapshot.params.companyId
  }

  //get company by id
  ngOnInit() {
    console.log(this.companyId)
    this.fetchCompanyFromService(this.companyId)
    this.myCompanyId = this.cidSer.getCompanyId()
  }

  //fetch company by id
  fetchCompanyFromService(companyId){
    this.comSvc.fetchCompanyFromService(companyId).subscribe(
      response=>{
        this.companyId=response.companyId
        this.companyName=response.companyName
        this.hqLocation=response.hqLocation
        this.linkedIn="http://"+response.linkedIn
        this.companyUsername=response.username
        this.password=response.password
      }
    )
    //fetch related vacancies from company
    this.comSvc.fetchVacanciesOfCompanyFromService(companyId).subscribe(
      response=>{
        this.companyVacancies=response
      }
    )
  }

  //loads vacancy as a pop up
  openVacancy(vacancyId){
    console.log(vacancyId)
    this.vidSvc.changeVacancyId(vacancyId)
    this.dialog.open(VacancyDetailsComponent);

  }
  
  //shows if position is filled
  setFilled(vacancyId){
    this.vacSvc.findVacancybyVacancyId(vacancyId).subscribe(response=>
      {
        this.oneVacancy=response
        this.vacancySkills = this.oneVacancy.vacancySkills
        this.vacSvc.findVacancybyVacancyId(vacancyId).subscribe(
          response=>{
            this.oneVacancy=response
            this.oneVacancy.description="POSITION NOW FILLED."
            this.vacSvc.updateVacancyOnServer(this.oneVacancy).subscribe(response=>
              {
                for(let skill of this.vacancySkills){
                  this.vacSvc.updateVacancySkillsOnServer(this.oneVacancy.vacancyId,skill.skillId).subscribe()
                }
                this.comSvc.addVacancyToCompanyOnService(this.companyId,this.oneVacancy.vacancyId).subscribe()
              })
          }
        )})
  }

  //delete a vacancy by id
  setDeleted(vacancyId){
    this.vacSvc.deleteVacancybyVacancyId(vacancyId).subscribe()
    window.location.reload()
  }
  
  //update company details
  editCompany() {
    this.dialog.open(CompanyEditComponent)
  }

}
