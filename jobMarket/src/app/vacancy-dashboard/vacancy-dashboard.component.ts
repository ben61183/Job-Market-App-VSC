import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewListingComponent } from '../new-listing/new-listing.component';
import { RoleAdminComponent } from '../role-admin/role-admin.component';

@Component({
  selector: 'app-vacancy-dashboard',
  templateUrl: './vacancy-dashboard.component.html',
  styleUrls: ['./vacancy-dashboard.component.css']
})
export class VacancyDashboardComponent{

  constructor(public dialog: MatDialog) { }

  openAddVacancy() {
    this.dialog.open(NewListingComponent);
  }

  openEditVacancy() {
    this.dialog.open(RoleAdminComponent);
  }



}
