import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyIdService {
  private companyIdSource = new BehaviorSubject(-1);
  currentCompanyId = this.companyIdSource.asObservable();

  companyId:number

  constructor() { }

  getCompanyId(){
    console.log("company local store:"+localStorage.getItem("companyId"))
    // return the myCompanyId as a number
    return Number(localStorage.getItem("companyId"))
  }

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

  logOutCompany(){
    this.changeCompanyId(-1)
  }
}
