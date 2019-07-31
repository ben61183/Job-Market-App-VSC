import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleComponent } from './role/role.component';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Role } from './role';
import { VacancyComponent } from './vacancy/vacancy.component';
import { Vacancy } from './vacancy';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  rootUrl:string
  oneRole:Role

  constructor(private httpsvc:HttpClient) {
    this.rootUrl = "http://localhost:7750/role"
  }


  findRoleByRoleId(roleId):Observable<Role>{
    return this.httpsvc.get<Role>(this.rootUrl+"/find/"+roleId)
  }

  updateRoleOnServer(role):Observable<RoleComponent>{
    const httpOptions = {// declare the headers for the content type
      headers: new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"})
    }
    var reqBody = "roleId="+role.roleId+"&category="+role.category+"&roleName="+role.roleName
    return this.httpsvc.post<RoleComponent>(this.rootUrl+"/register",reqBody,httpOptions)
  }

  loadAllRolesFromService():Observable<Role[]>{
    return this.httpsvc.get<Role[]>(this.rootUrl+"/list/")
  }

  loadVacanciesOfRoleFromService(roleId):Observable<Vacancy[]>{
    return this.httpsvc.get<Vacancy[]>("http://localhost:7750/vacancy/list/"+roleId)
  }



}
