import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacancyIdService {

  private vacancyIdSource = new BehaviorSubject(0);
  currentVacancyId = this.vacancyIdSource.asObservable();
  
  constructor() {}
  
  changeVacancyId(myVacancyId: number) {
    this.vacancyIdSource.next(myVacancyId)
  }
}
