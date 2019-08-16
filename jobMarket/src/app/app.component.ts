import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IT Job Market';
  otherTheme: boolean = false;
  dark:boolean

  ngOnInit(){
    this.dark = Boolean(localStorage.getItem("dark"))
    if(localStorage.getItem("dark")=="true"){
      this.dark=true
    } else if(localStorage.getItem("dark")=="false"){
      this.dark=false
    }

  }
}