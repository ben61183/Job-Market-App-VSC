import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  theme:boolean

  constructor() {
    this.theme=false
  }

  ngOnInit(){
    localStorage.setItem("theme",String(this.theme))
  }
  getTheme(){
    console.log(localStorage.getItem("theme"))
    return Boolean(localStorage.getItem("theme"))
  }

  changeTheme() {
    if(this.getTheme()){
      console.log("FALSE"+localStorage.getItem("theme"))
      localStorage.setItem("theme",String(false))
    }else{
      console.log("TRUE"+localStorage.getItem("theme"))
      localStorage.setItem("theme",String(true))

    }
  }
}
