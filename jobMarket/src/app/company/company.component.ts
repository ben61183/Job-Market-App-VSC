import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';
import { Vacancy } from '../vacancy';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companyId:number
  companyName:string
  hqLocation:string
  linkedIn:string
  companyVacancies:Vacancy[]


  constructor(private route: ActivatedRoute, private comSvc:CompanyService) {
    this.companyId = this.route.snapshot.params.companyId
  }

  ngOnInit() {
    console.log(this.companyId)
    this.fetchCompanyFromService(this.companyId)
  }

  fetchCompanyFromService(companyId){
    this.comSvc.fetchCompanyFromService(companyId).subscribe(
      response=>{
        this.companyId=response.companyId
        this.companyName=response.companyName
        this.hqLocation=response.hqLocation
        this.linkedIn=response.linkedIn
      }
    )
    this.comSvc.fetchVacanciesOfCompanyFromService(companyId).subscribe(
      response=>{
        this.companyVacancies=response
      }
    )
  }
}
