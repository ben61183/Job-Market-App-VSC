import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { MatTable } from '@angular/material/table';
import { RoleDashboardDataTableDataSource, RoleDashboardDataTableItem } from './role-dashboard-data-table-datasource';

import { Role } from '../role';
import { RoleRank } from '../role-rank';
import { RoleService } from '../role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-dashboard-data-table',
  templateUrl: './role-dashboard-data-table.component.html',
  styleUrls: ['./role-dashboard-data-table.component.css']
})

export class RoleDashboardDataTableComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource: MatTableDataSource<Role>;
  allRoles: Role[]
  role: Role
  displayedColumns = ['name', 'category']

  constructor(private rolSvc:RoleService, private router: Router) {
  }
  
  ngOnInit() {
    this.dataSource = new MatTableDataSource(); 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
    this.rolSvc.loadAllRolesFromService().subscribe(
      response => {
        this.allRoles = response
        console.log(response) 
        this.dataSource.data = response
      }
    )
  }
}
 

  
    
  

