import { Injectable } from '@angular/core';
import { Skill } from './skill';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private httpsvc:HttpClient) { }

  // load a list of skills via backend
  loadAllSkillsFromServer(){
    return this.httpsvc.get<Skill[]>("http://localhost:7750/skill/list")
  }
}
