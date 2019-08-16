import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CompanyDashboardDataSource, CompanyDashboardItem } from './company-dashboard-datasource';
import { CompanyService } from '../company.service';
import { Company } from '../company';
import { CompanyComponent } from '../company/company.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild(MatTable, {static: false}) table: MatTable<CompanyDashboardItem>;
  dataSource: MatTableDataSource<Company>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['companyName', 'hqLocation', 'linkedIn', 'email', 'companyUsername'];
  companies:Company[]
  company:Company

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private comSvc:CompanyService, public dialog: MatDialog,
    private router: Router){
    this.companies=[]
    this.company={username:"",email:"",companyName:"",linkedIn:"",hqLocation:"",password:"",companyId:0}
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // load all vacancies
    this.comSvc.loadAllCompanysFromServer().subscribe(
      response => {
        this.companies = response
        this.dataSource.data = response
        }
      
    )
  }




}
