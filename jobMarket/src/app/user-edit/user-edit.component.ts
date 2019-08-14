import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserIdService } from '../user-id.service';

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
  
  constructor(private userSvc: UserService, private idsvc: UserIdService) { }

  ngOnInit() {
    this.displayUser()
    this.passwordsMatch = true; 
  }

  displayUser() {
    this.userSvc.findUserByUserId(this.idsvc.getUserId()).subscribe(
      response => {
        this.userId = response.userId
        this.username = response.username
        this.email = response.email
        this.checkPassword = response.password
      }
    )
    }
  
  clickSave() {
    if (this.checkPassword == this.old_password && this.new_password == this.confirm_new_password) {
      console.log("Passwords Match")
      this.passwordsMatch = true; 
      this.saveUser() 
    } else {
      this.passwordsMatch = false; 
    }
  }

  saveUser() {
    this.userSvc.updateUserOnServer({
      userId: this.userId,
      username: this.username,
      email: this.email,
      password: this.new_password
    }).subscribe()
    window.location.reload()
  }
  
}
