import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// @Injectable(({
//   providedIn: 'root'
// }))

@Injectable()
export class UserIdService {
  private userIdSource = new BehaviorSubject(-1);
  currentUserId = this.userIdSource.asObservable();
  
  constructor() { }

  changeUserId(myUserId: number) {
    this.userIdSource.next(myUserId)
  }

  logOutUser(){
    this.changeUserId(-1)
  }
}
