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
  username: string
  password: string 
  companyVacancies:Vacancy[]

  oneVacancy:Vacancy
  myCompanyId:number

  constructor(private route: ActivatedRoute, private comSvc:CompanyService, public dialog: MatDialog,
    public vidSvc:VacancyIdService, private vacSvc:VacancyService, private cidSer:CompanyIdService) {
    this.companyId = this.route.snapshot.params.companyId
  }

  ngOnInit() {
    console.log(this.companyId)
    this.fetchCompanyFromService(this.companyId)
    this.myCompanyId = this.cidSer.getCompanyId()
  }

  fetchCompanyFromService(companyId){
    this.comSvc.fetchCompanyFromService(companyId).subscribe(
      response=>{
        this.companyId=response.companyId
        this.companyName=response.companyName
        this.hqLocation=response.hqLocation
        this.linkedIn=response.linkedIn
        this.username=response.username
        this.password=response.password
      }
    )
    this.comSvc.fetchVacanciesOfCompanyFromService(companyId).subscribe(
      response=>{
        this.companyVacancies=response
      }
    )
  }

  openVacancy(vacancyId){
    console.log(vacancyId)
    this.vidSvc.changeVacancyId(vacancyId)
    this.dialog.open(VacancyDetailsComponent);

  }
  
  setFilled(vacancyId){
    this.vacSvc.findVacancybyVacancyId(vacancyId).subscribe(
      response=>{
        this.oneVacancy=response
        this.oneVacancy.title+=" FILLED"
        this.vacSvc.updateVacancyOnServer(vacancyId)
      }
    )
  }

  setDeleted(vacancyId){
    this.vacSvc.deleteVacancybyVacancyId(vacancyId).subscribe()
  }
}
