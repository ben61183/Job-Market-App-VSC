import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterComponent } from './register/register.component';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

rootUrl: String

constructor(private httpsvc:HttpClient){
  this.rootUrl="http://localhost:7750/user"
}

// find user by id via backend
findUserByUserId(userId):Observable<RegisterComponent>{
  return this.httpsvc.get<RegisterComponent>(this.rootUrl+"/find/"+userId)
}

// load all users via backend
loadAllUsersFromServer(): Observable<User[]>{
  return this.httpsvc.get<User[]>(
    "http://localhost:7750/user/userlist")
}

// find user by name via backend
findUserByUsername(username):Observable<RegisterComponent>{
  return this.httpsvc.get<RegisterComponent>(this.rootUrl+"/find/username/"+username)
}

// find user by email via backend
findUserByEmail(email):Observable<RegisterComponent>{
  return this.httpsvc.get<RegisterComponent>(this.rootUrl+"/find/email/"+email)
}

// update user details via backend
updateUserOnServer(register):Observable<RegisterComponent>{
  const httpOptions={ //declare the headers for the content type
    headers: new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"})
  }
   var reqBody = "username="+register.username+"&password="+register.password +"&email="+register.email;
  return this.httpsvc.post<RegisterComponent>(this.rootUrl+"/register",reqBody,httpOptions)
}
}