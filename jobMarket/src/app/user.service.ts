import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterComponent } from './register/register.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  rootUrl:string

  constructor(private httpsvc:HttpClient){
    this.rootUrl="http://localhost:7750/user"
  }

  // load all users
  loadAllUsersFromService():Observable<User[]>{
    return this.httpsvc.get<User[]>(this.rootUrl+"/userlist")
  }

  // find user via backend
  findUserByUserId(userId):Observable<UserComponent>{
    return this.httpsvc.get<UserComponent>(this.rootUrl+"/find/"+userId)
  }

  // update skills of user via backend
  updateUserSkillsInService(userId,skillId):Observable<UserComponent>{
    const httpOptions = {// declare the headers for the content type
      headers: new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"})
    }
    var reqBody = "userId="+userId+"&skillId="+skillId
    return this.httpsvc.post<UserComponent>(this.rootUrl+"/assign/skill",reqBody,httpOptions)
  }
  
  // update vacancies of user via backend
  updateUserVacanciesInService(userId,vacancyId):Observable<UserComponent>{
    const httpOptions = {// declare the headers for the content type
      headers: new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"})
    }
    var reqBody = "userId="+userId+"&vacancyId="+vacancyId
    return this.httpsvc.post<UserComponent>(this.rootUrl+"/assign/vacancy",reqBody,httpOptions)
  }

  // delete user skills via backend
  deleteUserSkillsFromService(userId,skillId):Observable<UserComponent>{
    const httpOptions = {// declare the headers for the content type
      headers: new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"})
    }
    var reqBody = "userId="+userId+"&skillId="+skillId
    return this.httpsvc.post<UserComponent>(this.rootUrl+"/delete/skill",reqBody,httpOptions)
  }

  // delete user vacancy via backend
  deleteVacancyFromService(userId,vacancyId):Observable<UserComponent>{
    const httpOptions = {// declare the headers for the content type
      headers: new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"})
    }
    console.log("delete vac entered")
    console.log("user:"+userId+"vac:"+vacancyId)
    var reqBody = "userId="+userId+"&vacancyId="+vacancyId
    return this.httpsvc.post<UserComponent>(this.rootUrl+"/delete/vacancy",reqBody,httpOptions)
  }

  // update user via backend
  updateUserOnServer(user):Observable<UserComponent>{
    const httpOptions = {// declare the headers for the content type
      headers: new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"})
    }

    var reqBody = "username=" + user.username + "&password=" + user.password + "&email=" + user.email + "&userId=" + user.userId

    console.log(this.rootUrl+"/register", reqBody, httpOptions)

    return this.httpsvc.post<UserComponent>(this.rootUrl+"/register", reqBody, httpOptions)
  }

}
