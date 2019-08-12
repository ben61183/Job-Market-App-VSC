import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Skill } from '../skill';
import { Vacancy } from '../vacancy';
import { SkillService } from '../skill.service';
import { UserIdService } from '../user-id.service';
import { CompanyIdService } from '../company-id.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']  ,
  providers: [UserIdService,CompanyIdService]

})
export class UserComponent implements OnInit {
  userId: number
  username: string
  password: string
  email: string
  userSkills: Skill[] = []

  // edit user
  isEditable:boolean
  // used to mark skills not added by user
  antiSkills: Skill[] = []
  // used to collect vacancies saved by user
  savedVacancies: Vacancy[] = []
  // used to find the number of shared skills
  numShared:number[]
  // used to find the number of shared skills for each
  num:number
  // used to get the number of vacancy skills
  numSkills: number[]
  // all skills in db
  skills:Skill[]

  myUserId:number

  // used to ensure user can edit their page
  userPrivilege:boolean

  constructor(private useSvc: UserService, private skiSvc: SkillService, private route: ActivatedRoute,
    private uidSer:UserIdService) {
    // accessing userId from url param
    this.userId = this.route.snapshot.params.userId
    this.numShared = []
    this.num=0
    this.numSkills=[]
    this.skills=[]
    this.userPrivilege=false
    this.isEditable = false
  }

  ngOnInit() {
    console.log(this.userId)
    this.findUser(this.userId)
    this.loadAllSkills()
    this.myUserId = this.uidSer.getUserId()
    // compare logged in id with id in url
    if(this.myUserId==this.userId){
      this.userPrivilege=true
    }
  }

  findUser(userId){
    this.useSvc.findUserByUserId(this.userId).subscribe(
      response=>{
        this.username=response.username
        this.password=response.password
        this.email=response.email
        this.userSkills=response.userSkills
        this.savedVacancies=response.savedVacancies
        console.log(response)
        this.compareSkills(this.userSkills,this.savedVacancies)
        console.log(this.numShared)
      }
    )
  }

  // compare the skills assigned to user with those assigned to vacancy
  compareSkills(userSkills,vacancies){
    vacancies.forEach((vacancy,i) => {
      for(let userSkill of userSkills){
        for(let vacSkill of vacancy.vacancySkills){
          if(userSkill.skillId==vacSkill.skillId){
            this.num+=1
          }
        }
      }
      this.numShared.push(this.num)
      this.num=0
      this.numSkills.push(vacancy.vacancySkills.length)
      console.log(vacancy.vacancySkills.length)
    });
  }

  // load all skills
  loadAllSkills(){
    this.skiSvc.loadAllSkillsFromServer().subscribe(
      response => {
        this.skills = response
        this.skillsCheck()
      }
    )
  }

  // add a skill to user
  addToSkills(skill){
    this.userSkills.push(skill)
    this.useSvc.updateUserSkillsInService(this.userId,skill.skillId).subscribe()
    this.skillsCheck()
  }

  // delete a skill from user
  deleteFromSkills(skill){
    this.useSvc.deleteUserSkillsFromService(this.userId,skill.skillId).subscribe()
    this.skillsCheck()
    // window.location.reload();
  }

  // check if skills are already added to user, if so they are not displayed as buttons
  skillsCheck(){
    this.antiSkills=this.skills
    console.log("anti:"+this.antiSkills+this.antiSkills.length)

    this.antiSkills.forEach((aSkill,i) => {
      for(let uSkill of this.userSkills){
        if(aSkill.skillId==uSkill.skillId){
          delete this.antiSkills[i]
        }
    }})
    }

  deleteFromVacancies(vacancyId){
    this.useSvc.deleteVacancyFromService(this.userId,vacancyId)
    // window.location.reload()
  }

  toggleEdits(){
    this.isEditable = !this.isEditable
    this.updateUserInService()
  }

  updateUserInService(){
    
  }
}