import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterComponent } from './register/register.component';

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

updateUserOnServer(register):Observable<RegisterComponent>{
  const httpOptions={ //declare the headers for the content type
    headers: new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"})
  }
   var reqBody = "userId="+register.userId+"&username="+register.username+"&password="+register.password +"&email="+register.email;
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
