import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// user service to maintain logged in user id throughout app and after refreshes
@Injectable({
  providedIn: 'root'
})
export class UserIdService {
  private userIdSource = new BehaviorSubject(-1);
  currentUserId = this.userIdSource.asObservable();
  
  userId:number

  constructor() { }

  // get user id to load correct data/priveledges
  getUserId(){
    console.log("user local store:"+localStorage.getItem("userId"))
    // return the userId as a number
    return Number(localStorage.getItem("userId"))
  }

  // change user id based on login
  changeUserId(myUserId: number) {
    console.log("userId passed:"+myUserId)
    this.userIdSource.next(myUserId)
    // subscribe the value of the userId
    this.currentUserId.subscribe(userId => this.userId = userId)
    console.log("userId in service:"+this.userId)
    // store the userId locally (must be converted to string)
    localStorage.setItem("userId",String(this.userId))
    // console.log(this.currentUserId)
  }

  // admin given userId = 1
  logInAdmin(){
    console.log("admin login")
    this.changeUserId(1)
  }

  logOutUser(){
    this.changeUserId(-1)
  }

}
