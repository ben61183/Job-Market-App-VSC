import { Component } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IT Job Market';
  otherTheme: boolean = false;

  constructor(private theSer:ThemeService) { }

  ngOnInit(){
    this.otherTheme=this.theSer.getTheme()
    console.log(this.otherTheme)
  }
}
