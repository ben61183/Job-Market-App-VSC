import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IT Job Market';
  otherTheme: boolean = false;

  changeTheme() {
    this.otherTheme = !this.otherTheme
    console.log(this.otherTheme)
  }
}


