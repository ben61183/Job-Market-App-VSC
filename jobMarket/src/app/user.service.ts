import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterComponent } from './register/register.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserComponent } from './user/user.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  rootUrl:string

  constructor(private httpsvc:HttpClient){
    this.rootUrl="http://localhost:7750/user"
  }


  findUserByUserId(userId):Observable<UserComponent>{
    return this.httpsvc.get<UserComponent>(this.rootUrl+"/find/"+userId)
  }

  updateUserSkillsInService(userId,skillId):Observable<UserComponent>{
    const httpOptions = {// declare the headers for the content type
      headers: new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"})
    }
    var reqBody = "userId="+userId+"&skillId="+skillId
    return this.httpsvc.post<UserComponent>(this.rootUrl+"/assign/skill",reqBody,httpOptions)
  }

  deleteUserSkillsFromService(userId,skillId):Observable<UserComponent>{
    const httpOptions = {// declare the headers for the content type
      headers: new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"})
    }
    var reqBody = "userId="+userId+"&skillId="+skillId
    return this.httpsvc.post<UserComponent>(this.rootUrl+"/delete/skill",reqBody,httpOptions)
  }

  deleteVacancyFromService(userId,vacancyId){
    const httpOptions = {// declare the headers for the content type
      headers: new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"})
    }
    console.log(userId)
    console.log(vacancyId)
    var reqBody = "userId="+userId+"&vacancyId="+vacancyId
    console.log(reqBody)
    return this.httpsvc.post<UserComponent>(this.rootUrl+"/delete/vacancy",reqBody,httpOptions)
  }
}
