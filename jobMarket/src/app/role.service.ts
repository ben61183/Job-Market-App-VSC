import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleComponent } from './role/role.component';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Role } from './role';
import { Vacancy } from './vacancy';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  // root url for REST calls
  rootUrl:string
  oneRole:Role

  constructor(private httpsvc:HttpClient) {
    this.rootUrl = "http://localhost:7750/role"
  }

  // find a role using the roleId
  findRoleByRoleId(roleId):Observable<Role>{
    return this.httpsvc.get<Role>(this.rootUrl+"/find/"+roleId)
  }

  // update a role if changes made
  updateRoleOnServer(role):Observable<RoleComponent>{
    const httpOptions = {// declare the headers for the content type
      headers: new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"})
    }
    var reqBody = "category="+role.category+"&roleName="+role.roleName
    return this.httpsvc.post<RoleComponent>(this.rootUrl+"/register",reqBody,httpOptions)
  }

  // load all roles
  loadAllRolesFromService():Observable<Role[]>{
    return this.httpsvc.get<Role[]>(this.rootUrl+"/list/")
  }

  // load all vacancies associated with role
  loadVacanciesOfRoleFromService(roleId):Observable<Vacancy[]>{
    return this.httpsvc.get<Vacancy[]>(this.rootUrl+"/thesevacancies/"+roleId)
  }

  // filter jobs by the category
  findJobsByCategory(searchParam):Observable<Role[]>{
    return this.httpsvc.get<Role[]>(this.rootUrl+"/fetch_category/?searchParam="+searchParam)
    }

  //delete role by roleId
  deleteRoleByRoleId(roleId):Observable<RoleComponent>{
    console.log(this.rootUrl+"/delete/"+roleId)
    return this.httpsvc.delete<RoleComponent>(this.rootUrl+"/delete/"+roleId)
  }
}
