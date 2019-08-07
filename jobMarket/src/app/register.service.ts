import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }
   registerUser(username,password,email) {
     console.log('Registering User : registerUser');
   };

   const httpOptions ={
     headers:new HttpHeaders({
       "Content-Type":"application/x-www-form-urlencoded"
     })
   };
  

}
