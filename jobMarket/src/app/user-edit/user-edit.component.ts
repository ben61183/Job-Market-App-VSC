import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserIdService } from '../user-id.service';
import { Skill } from '../skill';
import { Vacancy } from '../vacancy';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userId: number
  username: string 
  email: string 
  old_password: string
  new_password: string 
  confirm_new_password: string 
  checkPassword: string 
  passwordsMatch: boolean 
  myUserId: number
  editUserId: number 
  userSkills: Skill[] = []
  savedVacancies: Vacancy[] = []

  constructor(private userSvc: UserService, private idsvc: UserIdService) { }

  ngOnInit() {
    this.passwordsMatch = true; 
    this.editUserId = Number(localStorage.getItem("editUserId")); 
    console.log(this.editUserId)
    this.displayUser()
  }

  displayUser() {
    this.userSvc.findUserByUserId(this.editUserId).subscribe(
      response => {
        this.userId = response.userId
        this.username = response.username
        this.email = response.email
        this.checkPassword = response.password
        this.userSkills=response.userSkills
        this.savedVacancies = response.savedVacancies
        console.log(this.userSkills)
        console.log(this.savedVacancies)
      }
    )
    }
  
  clickSave() {
    this.myUserId = this.idsvc.getUserId()
    console.log(this.myUserId)

    if (this.checkPassword == this.old_password && this.new_password == this.confirm_new_password || this.myUserId == 0) {
      console.log("Passwords Match")
      this.passwordsMatch = true; 
      this.saveUser() 
    } else {
      this.passwordsMatch = false; 
    }
  }

  saveUser() {
    console.log(this.userSkills)
    this.userSvc.updateUserOnServer({
      userId: this.userId,
      username: this.username,
      email: this.email,
      password: this.new_password
    }).subscribe(response => {
      this.userId = response.userId,
      this.username = response.username,
      this.email = response.email,
      this.new_password = response.email
      
      // ensures that the users skills are saved when details are changed
      for (let skill of this.userSkills) {
        this.userSvc.updateUserSkillsInService(this.userId, skill.skillId).subscribe()
        console.log(skill)
        window.location.reload()

      }

      // ensures that the vacancies are saved when details are changed 
      for (let vacancy of this.savedVacancies) {
        this.userSvc.updateUserVacanciesInService(this.userId, vacancy.vacancyId).subscribe()
        console.log(vacancy)
        window.location.reload()
        
      }
      
      console.log(this.myUserId)
    })
    

  }
  
}
