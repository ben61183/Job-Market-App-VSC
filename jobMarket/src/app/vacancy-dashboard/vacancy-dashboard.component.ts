import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewListingComponent } from '../new-listing/new-listing.component';
import { RoleAdminComponent } from '../role-admin/role-admin.component';
import { UserIdService } from '../user-id.service';

@Component({
  selector: 'app-vacancy-dashboard',
  templateUrl: './vacancy-dashboard.component.html',
  styleUrls: ['./vacancy-dashboard.component.css'],
  providers: [UserIdService]
})
export class VacancyDashboardComponent{

  myUserId:number

  constructor(public dialog: MatDialog, private uidSer:UserIdService) {
    this.myUserId=0
  }

  ngOnInit(){
    this.uidSer.currentUserId.subscribe(myUserId => this.myUserId = myUserId)
  }

  openAddVacancy() {
    this.dialog.open(NewListingComponent);
  }

  openEditVacancy() {
    this.dialog.open(RoleAdminComponent);
  }



}
