import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyComponent } from './company/company.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vacancy } from './vacancy';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  rootUrl:string
  constructor(private httpsvc:HttpClient) {
    this.rootUrl="http://localhost:7750/company"
  }

  // get all companies via backend
  getAllCompanies():Observable<Company[]>{
    return this.httpsvc.get<Company[]>(this.rootUrl+"/list/")
  }

  // update company details via backend
  updateCompanyOnServer(company):Observable<CompanyComponent>{
    const httpOptions = {// declare the headers for the content type
      headers: new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"})
    }
    var reqBody = "companyName="+company.companyName+"&hqLocation="+ company.hqLocation+"&linkedIn=" + 
    company.linkedIn + "&companyUsername=" + company.companyUsername + "&companyPassword=" + company.companyPassword + 
    "&companyEmail=" + company.email + "&companyId=" + company.companyId;
    return this.httpsvc.post<CompanyComponent>(this.rootUrl+"/register", reqBody, httpOptions)
  }

  // fetch company via backend
  fetchCompanyFromService(companyId):Observable<Company>{
    return this.httpsvc.get<Company>(this.rootUrl+"/find/"+companyId)
  }

  // fetch company vacancies via backend
  fetchVacanciesOfCompanyFromService(companyId):Observable<Vacancy[]>{
    return this.httpsvc.get<Vacancy[]>(this.rootUrl+"/thesevacancies/"+companyId)
  }

  // add vacancy to a company via backend
  addVacancyToCompanyOnService(companyId,vacancyId):Observable<Company>{
    const httpOptions = {// declare the headers for the content type
      headers: new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"})
    }
    var reqBody = "companyId="+companyId+"&vacancyId="+vacancyId
    return this.httpsvc.post<Company>(this.rootUrl+"/assign/vacancy",reqBody,httpOptions)
  }

  // load list of companies via backend
  loadAllCompanysFromServer(): Observable<Company[]> {
    return this.httpsvc.get<Company[]>(
      this.rootUrl + "/list"
    )
  }

  deleteCompanyFromService(companyId){
    return this.httpsvc.delete<Company>(this.rootUrl+"/delete/"+companyId)
  }

}
