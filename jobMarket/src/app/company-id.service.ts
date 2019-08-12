import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class CompanyIdService {
  private companyIdSource = new BehaviorSubject(-1);
  currentCompanyId = this.companyIdSource.asObservable();
  
  constructor() { }

  changeCompanyId(myCompanyId: number) {
    this.companyIdSource.next(myCompanyId)
    console.log(myCompanyId)
  }

  logOutCompany(){
    this.changeCompanyId(-1)
  }
}
