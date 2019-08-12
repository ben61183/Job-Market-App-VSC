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
  
  constructor(private breakpointObserver: BreakpointObserver, private uidSer:UserIdService,
    private cidSer:CompanyIdService) {}
  

  ngOnInit() {
    this.myUserId = this.uidSer.getUserId()
    this.myCompanyId = this.cidSer.getCompanyId()
    console.log(this.myCompanyId)
  }

  logOut(){
    this.uidSer.changeUserId(-1)
    this.cidSer.changeCompanyId(-1)
  }
}
