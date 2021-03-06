import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VacancyComponent } from './vacancy/vacancy.component';
import { Vacancy } from './vacancy';
import { Skill } from './skill';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  rootUrl: String

constructor(private httpsvc:HttpClient) {
  // root url for making api requests
  this.rootUrl= "http://localhost:7750/vacancy"
}

// find vacancy from db
findVacancybyVacancyId(vacancyId):Observable<Vacancy>{
  return this.httpsvc.get<Vacancy>(this.rootUrl+"/find/"+vacancyId)
}

// update vacancy via backend
updateVacancyOnServer(vacancy):Observable<Vacancy>{
  const httpOptions = {// declare the headers for the content type
    headers: new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"})
  }
  var reqBody = "vacancyId="+vacancy.vacancyId+"&description="+vacancy.description +"&jobType="+vacancy.job_type+"&link="+vacancy.link+"&location="+vacancy.location+"&postTime="+vacancy.postTime+"&salary="+vacancy.salary+"&uploadYear="+vacancy.uploadYear+"&title="+vacancy.title;
  return this.httpsvc.post<Vacancy>(this.rootUrl+"/register",reqBody,httpOptions)
}

// update roles of vacancy via backend
updateVacancyRoleOnServer(vacancyId,roleId):Observable<VacancyComponent>{
  const httpOptions= {
    headers: new HttpHeaders(
      {"Content-Type":"application/x-www-form-urlencoded"}
    )
    }
    var reqBody="vacancyId="+vacancyId+"&roleId="+roleId

    return this.httpsvc.post<VacancyComponent>(
      this.rootUrl + "/assign/role",reqBody,httpOptions)
    }

// update skills of vacancy via backend 
updateVacancySkillsOnServer(vacancyId,newSkillId):Observable<VacancyComponent>{
  console.log("reached skill updater")
  const httpOptions= {
    headers: new HttpHeaders(
      {"Content-Type":"application/x-www-form-urlencoded"}
    )
    }
    var reqBody="vacancyId="+vacancyId+"&skillId="+newSkillId
    return this.httpsvc.post<VacancyComponent>(
      this.rootUrl + "/assign/skill",reqBody,httpOptions)
}

// delete vacancy via backend
deleteVacancybyVacancyId(vacancyId):Observable<VacancyComponent>{
  return this.httpsvc.delete<VacancyComponent>(this.rootUrl+"/delete/"+vacancyId)
}

// load all vacancies via backend
loadAllVacanciesFromServer(): Observable<Vacancy[]>{
  return this.httpsvc.get<Vacancy[]>(
    "http://localhost:7750/vacancy/list")
}

// load skills of vacancy via backend
loadVacancySkillsFromServer(vacancyId): Observable<Skill[]>{
  return this.httpsvc.get<Skill[]>(
    this.rootUrl+"/theseskills/"+vacancyId
  )
}
}