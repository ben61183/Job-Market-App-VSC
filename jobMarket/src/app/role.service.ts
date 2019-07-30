import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleComponent } from './role/role.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from './role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  rootUrl:string

  constructor(private httpsvc:HttpClient) {
    this.rootUrl = "http://localhost:7750/role"
  }

  findRoleByRoleId(roleId):Observable<RoleComponent>{
    return this.httpsvc.get<RoleComponent>(this.rootUrl+"/find/"+roleId)
  }

  updateRoleOnServer(role):Observable<RoleComponent>{
    const httpOptions = {// declare the headers for the content type
      headers: new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"})
    }
    var reqBody = "roleId="+role.roleId+"&category="+role.category+"&roleName="+role.roleName
    return this.httpsvc.post<RoleComponent>(this.rootUrl+"/register",reqBody,httpOptions)
  }

  loadAllRolesFromService():Observable<Role[]>{
    return this.httpsvc.get<Role[]>("http://localhost:7750/role/list")
  }


}
