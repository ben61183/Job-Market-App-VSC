import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { UserIdService } from '../user-id.service';
import { CompanyIdService } from '../company-id.service';

@Component({
  selector: 'app-nav-bar', 
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']  ,
  providers: [UserIdService,CompanyIdService]
})
export class NavBarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );

  myUserId:number
  myCompanyId:number

  dark:boolean
  
  constructor(private breakpointObserver: BreakpointObserver, private uidSer:UserIdService,
    private cidSer:CompanyIdService) {}
  
  ngOnInit() {
    this.myUserId = this.uidSer.getUserId()
    this.myCompanyId = this.cidSer.getCompanyId()
    console.log(this.myCompanyId)
    if(this.dark==undefined || this.dark==null){
      localStorage.setItem("dark","false")
    }
    
    if(localStorage.getItem("dark")=="true"){
      this.dark=true
    } else if(localStorage.getItem("dark")=="false"){
      this.dark=false
    }
    console.log("dark"+this.dark)
    localStorage.setItem("one","twothree")
  }

  logOut(){
    this.uidSer.changeUserId(-1)
    this.cidSer.changeCompanyId(-1)
    if(window.location.href=="http://localhost:4500/"){
      window.location.reload()
    }
  }
  
  // themeing of light/dark
  changeTheme() {
    console.log("PREDARK:"+this.dark)
    console.log("PRESTORE"+localStorage.getItem("dark"))
    this.dark = !this.dark
    console.log("DARK:"+this.dark)
    if(this.dark){
    localStorage.setItem("dark","true")
    } else if(!this.dark){
      localStorage.setItem("dark","false")
    }
    
    console.log("STORE:"+localStorage.getItem("dark"))
  }
}
