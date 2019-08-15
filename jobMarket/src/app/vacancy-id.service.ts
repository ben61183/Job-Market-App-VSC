import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// vacancy service to maintain vacancyid when opening popup
@Injectable({
  providedIn: 'root'
})
export class VacancyIdService {

  // create changable id source
  private vacancyIdSource = new BehaviorSubject(0);
  currentVacancyId = this.vacancyIdSource.asObservable();
  
  constructor() {}
  
  // change vacancy id on popup
  changeVacancyId(myVacancyId: number) {
    this.vacancyIdSource.next(myVacancyId)
  }
}
