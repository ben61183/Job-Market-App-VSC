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
    console.log("appcomaft"+this.dark)
    console.log("appstore"+localStorage.getItem("dark"))
    console.log(localStorage.getItem("one"))
  }

  // changeTheme() {
  //   this.otherTheme = !this.otherTheme
  //   console.log("appComponent:"+this.otherTheme)
  //   localStorage.setItem("dark",String(this.dark))
  // }
}