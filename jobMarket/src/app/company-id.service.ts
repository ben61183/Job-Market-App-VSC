import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// company service to maintain logged in company
@Injectable({
  providedIn: 'root'
})
export class CompanyIdService {
  private companyIdSource = new BehaviorSubject(-1);
  currentCompanyId = this.companyIdSource.asObservable();

  companyId:number

  constructor() { }

  // get company id from local storage
  getCompanyId(){
    console.log("company local store:"+localStorage.getItem("companyId"))
    // return the myCompanyId as a number
    return Number(localStorage.getItem("companyId"))
  }

  // save company id locally
  changeCompanyId(myCompanyId: number) {
    console.log("companyId passed:"+myCompanyId)
    this.companyIdSource.next(myCompanyId)
    // subscribe the value of the myCompanyId
    this.currentCompanyId.subscribe(myCompanyId => this.companyId = myCompanyId)
    console.log("companyId in service:"+this.companyId)
    // store the myCompanyId locally (must be converted to string)
    localStorage.setItem("companyId",String(this.companyId))
    // console.log(this.currentUserId)
  }

  // set id to logout
  logOutCompany(){
    this.changeCompanyId(-1)
  }
}
