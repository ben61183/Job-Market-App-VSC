import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewListingComponent } from '../new-listing/new-listing.component';
import { RoleAdminComponent } from '../role-admin/role-admin.component';
import { UserIdService } from '../user-id.service';
import { CompanyIdService } from '../company-id.service';

@Component({
  selector: 'app-vacancy-dashboard',
  templateUrl: './vacancy-dashboard.component.html',
  styleUrls: ['./vacancy-dashboard.component.css'],
  providers: [UserIdService, CompanyIdService]
})
export class VacancyDashboardComponent{

  myUserId:number

  myCompanyId:number


  constructor(public dialog: MatDialog, private uidSer:UserIdService, private cidSer:CompanyIdService) {
    this.myUserId=0
  }

  ngOnInit(){
    this.myUserId = this.uidSer.getUserId()
    this.cidSer.currentCompanyId.subscribe(myCompanyId => this.myCompanyId = myCompanyId)

  }

  openAddVacancy() {
    this.dialog.open(NewListingComponent);
  }

  openEditVacancy() {
    this.dialog.open(RoleAdminComponent);
  }



}
