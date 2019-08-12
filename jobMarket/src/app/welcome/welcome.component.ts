import { Component, OnInit } from '@angular/core';
import { UserIdService } from '../user-id.service';
import { CompanyIdService } from '../company-id.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']  ,
  providers: [UserIdService,CompanyIdService]
})
export class WelcomeComponent implements OnInit {

  myUserId:number
  myCompanyId:number

  constructor(private uidSer:UserIdService, private cidSer:CompanyIdService) { }

  ngOnInit() {  
    this.uidSer.currentUserId.subscribe(myUserId => this.myUserId = myUserId)
    this.cidSer.currentCompanyId.subscribe(myCompanyId=>this.myCompanyId=myCompanyId)
  }

}
