import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class CompanyIdService {
  private companyIdSource = new BehaviorSubject(-1);
  currentCompanyId = this.companyIdSource.asObservable();
  companyId:number

  
  constructor() { }

  getCompanyId(){
    console.log("local store:"+localStorage.getItem("companyId"))
    // return the userId as a number
    return Number(localStorage.getItem("companyId"))
  }

  // changeUserId(myCompanyId: number) {
  //   console.log("companyId passed:"+myCompanyId)
  //   this.companyIdSource.next(myCompanyId)
  //   // subscribe the value of the userId
  //   this.currentCompanyId.subscribe(myCompanyId => this.myCompanyId = myCompanyId)
  //   console.log("userId in service:"+this.myCompanyId)
  //   // store the userId locally (must be converted to string)
  //   localStorage.setItem("userId",String(this.myCompanyId))
  //   // console.log(this.currentUserId)
  // }

  logOutCompany(){
    // this.changeCompanyId(-1)
  }
}
