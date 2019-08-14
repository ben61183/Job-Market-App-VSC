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

findUserByUserId(userId):Observable<RegisterComponent>{
  return this.httpsvc.get<RegisterComponent>(this.rootUrl+"/find/"+userId)
}

loadAllUsersFromServer(): Observable<User[]>{
  return this.httpsvc.get<User[]>(
    "http://localhost:7750/user/userlist")
}

findUserByUsername(username):Observable<RegisterComponent>{
  return this.httpsvc.get<RegisterComponent>(this.rootUrl+"/find/username/"+username)
}

findUserByEmail(email):Observable<RegisterComponent>{
  return this.httpsvc.get<RegisterComponent>(this.rootUrl+"/find/email/"+email)
}

updateUserOnServer(register):Observable<RegisterComponent>{
  const httpOptions={ //declare the headers for the content type
    headers: new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"})
  }
   var reqBody = "username="+register.username+"&password="+register.password +"&email="+register.email;
  return this.httpsvc.post<RegisterComponent>(this.rootUrl+"/register",reqBody,httpOptions)
}
}




// updateVacancyOnServer(vacancy):Observable<VacancyComponent>{
//   const httpOptions = {// declare the headers for the content type
//     headers: new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"})
//   }
//   var reqBody = "vacancyId="+vacancy.vacancyId+"&company="+vacancy.company+"&description="+vacancy.description +"&jobType="+vacancy.job_type+"&link="+vacancy.link+"&location="+vacancy.location+"&postTime="+vacancy.postTime+"&salary="+vacancy.salary+"&uploadYear="+vacancy.uploadYear+"&title="+vacancy.title;
//   return this.httpsvc.post<VacancyComponent>(this.rootUrl+"/register",reqBody,httpOptions)
// }
